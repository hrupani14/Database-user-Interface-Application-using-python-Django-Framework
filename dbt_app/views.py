from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pyexcel
import json

filename = './ah.xls'


header_srno = 'Sr. No.'
header_ploc = 'Present Location'
header_lock = 'Lock'
header_sdto = 'Send To'
header_sndt = 'Sent Date'
header_acpt = 'Accept / Reject'
header_comt = 'Remarks'
header_pdtp = 'Product Type'
header_inf_batch = 'Stage _8 No.'
header_laser_welding = ['Manipulation_1', 'Manipulation_1 Done' ]
header_wt_result = 'Stage_13 Result'

wt_metal_sheet_names = ['Stage_13', 'Stage_12']

raw_materials = []
laser_welds = {}
opened_sheets = []
present_locations = {}
wt_metal_results = {}

@csrf_exempt
def add(request):
    global opened_sheets    
    print('opened_sheets: ',  opened_sheets)
    sheet_opened = request.POST['sheet_name']
    
    if not (sheet_opened in opened_sheets):
        opened_sheets.append(sheet_opened)
        return JsonResponse({'response': 'success'})
    else:
        return JsonResponse({})


@csrf_exempt
def login(request):
    global opened_sheets    
    print('opened_sheets: ',  opened_sheets)
    
    sheet_opened = request.POST['sheet_name']    
    if 'remove' in request.POST:
        if sheet_opened in opened_sheets:
            opened_sheets.remove(sheet_opened)
        return JsonResponse({'response': 'success'})
        
    username = request.POST['username']
    password = request.POST['password']
    
    if sheet_opened in opened_sheets:
        print('Here- Trying to open an already opened sheet')
        return JsonResponse({'response': 'contention'})
    else:
        print('Here- Trying to open a Not opened sheet')
        if username == "asds" and password == "asds123":
            print('success - Added to opened sheets')
            #opened_sheets.append(sheet_opened)
            return JsonResponse({'response': 'success'})
        else:
            print('wrong data')
            return JsonResponse({'response': 'failure'})    


def getkeyindices(header, colHeaders):
    indices = []
    for c in colHeaders:
        try:
            loc = header.index(c)
        except ValueError:
            loc = -1
        indices.append(loc)
    
    return indices

def format_data(target_sheet_data, present_loc = None):
    header = target_sheet_data[0]
    srnoIndex, presentLocIndex, lockKeyIndex, sendtoIndex, lwIndex = getkeyindices(header, [header_srno, header_ploc, header_lock, header_sdto, header_laser_welding[0]])
    primarykeyindex = srnoIndex + 1
    last_col_index = lockKeyIndex + 1
    
    hidden_rows = []
    non_empty_data = [header[:last_col_index]]
    
    row_index = 0
    for row in target_sheet_data[1:]:        
        is_not_empty = False
                
        pk = row[primarykeyindex]
        if pk is not None:            
            if len(pk)!=0 or pk.strip() !='':
            	is_not_empty = True

        if is_not_empty:
            if row[lockKeyIndex] == 1 or row[lockKeyIndex] == '1' or row[lockKeyIndex] == 'true':
            	row[lockKeyIndex] = 'true'
            	hidden_rows.append(row_index)
            	if not (present_loc in raw_materials):
            		if row[sendtoIndex] == 'Final Assembly':
	            		present_locations[row[primarykeyindex]] = 'Final Assembly'
            elif row[lockKeyIndex] == 0 or row[lockKeyIndex] == '0' or row[lockKeyIndex] == 'false' or row[lockKeyIndex] == '':
            	row[lockKeyIndex] = 'false'
            	if not (present_loc in raw_materials):
            		present_locations[row[primarykeyindex]] = present_loc

            if lwIndex != -1:
            	laser_welds[row[primarykeyindex]] = row[lwIndex]

            if present_loc == wt_metal_sheet_names[0]:
            	wt_metal_results[row[primarykeyindex]] = row[-3]
            			
            non_empty_data.append(row[:last_col_index])
            row_index+=1
            
    return non_empty_data, hidden_rows

@csrf_exempt
def save(request):
    global filename, opened_sheets
    global header_srno, header_pdtp, header_inf_batch, header_sdto, header_sndt, header_acpt, header_comt, header_lock
    
    sheet_name = request.POST['name']
    json_data = request.POST['json_data']
    y = json.loads(json_data)
    new_data = y['hot_data']
    header = y['header']    
    new_data.insert(0, header)
        
    new_data = format_data(new_data)[0]

    	            
    sendtos = {}
    onlyOlds = []
    transport_sheets = []
    
    ## get current sheet from old book    
    old_book = pyexcel.get_book(file_name=filename)
    old_data = old_book[sheet_name].get_array()
    srnoIndex, pdtypeIndex, infBatchIndex, sendtoIndex, sentdateIndex, acceptIndex, remarkIndex, lockIndex = getkeyindices(header, [header_srno, header_pdtp, header_inf_batch, header_sdto, header_sndt, header_acpt, header_comt, header_lock ])
    
    primaryKeyIndex = srnoIndex + 1
    print(header_pdtp, pdtypeIndex)
    
    new_ids = [row[primaryKeyIndex] for row in new_data[1:]]
    old_ids = [row[primaryKeyIndex] for row in old_data[1:]]
                
    inBoth_ids, onlyNew_ids, onlyOld_ids = [], [], []
    inBoth_rows, onlyNew_rows, onlyOld_rows = [], [], []
    inBoth_locks, onlyNew_locks, onlyOld_locks = [], [], []
    inBoth_sends, onlyNew_sends, onlyOld_sends = [], [], []
        
    for idx, nid in enumerate(new_ids):
        row = new_data[idx + 1]
        new_srno = row[srnoIndex]
        new_pdtype = row[pdtypeIndex]        
        new_sendto = row[sendtoIndex]
        new_sentdate = row[sentdateIndex]
        new_accept = row[acceptIndex]
        new_remarks = row[remarkIndex]
        new_lock = row[lockIndex]
        new_inf = None if infBatchIndex == -1 else row[infBatchIndex]
        
        if nid in old_ids:# Existing Entry - present in both
            index_in_old_data = old_ids.index(nid)
            old_lock = old_data[index_in_old_data + 1][lockIndex]
            if old_lock == 'false' or old_lock == '':                
                if new_lock == 'true':
                    if old_data[index_in_old_data + 1][-1] == 'backward':
                        new_data[idx+1][lockIndex] = 'false'
                    else:
                        try:
                            sendtos[new_sendto].append([new_srno, nid, new_pdtype, new_inf, new_sentdate, new_accept, new_remarks])
                        except KeyError:
                            sendtos.update({new_sendto : [ [new_srno, nid, new_pdtype, new_inf, new_sentdate, new_accept, new_remarks] ]})
                        transport_sheets.append(new_sendto)
           
            
            inBoth_ids.append(nid)
            inBoth_locks.append(new_lock)
            inBoth_sends.append(new_sendto)
            inBoth_rows.append(row)
        else: ## New Entry - only new        	
            #new_data[idx + 1].append('new')
            if new_lock == 'true':                        
                try:
                    sendtos[new_sendto].append([new_srno, nid, new_pdtype, new_inf, new_sentdate, new_accept, new_remarks])
                except KeyError:
                    sendtos.update({new_sendto : [ [new_srno, nid, new_pdtype, new_inf, new_sentdate, new_accept, new_remarks] ]})

                transport_sheets.append(new_sendto)

            onlyNew_ids.append(nid)
            onlyNew_locks.append(new_lock)
            onlyNew_sends.append(new_sendto)
            onlyNew_rows.append(row)

    deleted_ids = []
    keep_rows = []	
    for idx, oid in enumerate(old_ids):
        row = old_data[idx + 1]
        if not (oid in new_ids): ## only in old
            # it can be either deleted [only posible for stage_1 sheet]
            # or it was added by transport while this sheet was opened             
            onlyOld_ids.append(oid)
            onlyOld_locks.append(row[lockIndex])
            onlyOld_sends.append(row[sendtoIndex])
            onlyOld_rows.append(row)
            onlyOlds.append(oid)
            if row[-1] == 'forward':# or row[-1] == 'new':
            	keep_rows.append(row)
            else:
            	deleted_ids.append(oid)

    print(inBoth_ids, onlyNew_ids, onlyOld_ids)
    print(inBoth_rows, onlyNew_rows, onlyOld_rows)

    print('sentouts : ', sendtos)
    print('onlyOlds : ', onlyOlds)
    print('Transport sheets: ', transport_sheets)
    
    if sheet_name in raw_materials:
        transport_sheets.clear();
        print('No sendTo allowed for Materials')
                        
    new_book = pyexcel.Book()  #Creates a new book for the updated sheets
    
    for old_sheet in old_book:
        oldsheet_name = old_sheet.name
        if oldsheet_name == sheet_name:
            if len(keep_rows) > 0:
            	new_data.extend(keep_rows)
                        
            new_sheet = pyexcel.Sheet(new_data) #copy new data into a sheet
        elif oldsheet_name in transport_sheets:
            old_data = format_data(old_book[oldsheet_name].get_array())[0]
            header = old_data[0]
            temp_srnoIndex, temp_prodTypeIndex, temp_infBatchIndex, temp_lockIndex = getkeyindices(header, [header_srno, header_pdtp, header_inf_batch, header_lock])
            
            print(temp_srnoIndex, temp_lockIndex, temp_infBatchIndex, temp_prodTypeIndex)
            
            temp_primaryKeyIndex = temp_srnoIndex + 1                       
            row_length = len(header)
            
            transport_ids = sendtos[oldsheet_name]
            existing_ids = [row[temp_primaryKeyIndex] for row in old_data[1:]]
            
            for tsn, tid, tpt, tinf, tsd, tar, trm in transport_ids:
                if tid in existing_ids:
                    tid_index = existing_ids.index(tid)
                    old_data[tid_index + 1][0] = sheet_name
                    old_data[tid_index + 1][1] = tsd
                    old_data[tid_index + 1][2] = tar
                    old_data[tid_index + 1][3] = trm
                    if temp_infBatchIndex != -1 and tinf != None:
                        old_data[tid_index + 1][temp_infBatchIndex] = tinf
                                            
                    old_data[tid_index + 1][temp_lockIndex] = 'false'
                    if oldsheet_name in opened_sheets:
                    	old_data[tid_index + 1].append('backward')
                else:
                    new_row = [''] * row_length
                    new_row[0] = sheet_name
                    new_row[1] = tsd
                    new_row[2] = tar
                    new_row[3] = trm                    
                    new_row[temp_primaryKeyIndex] = tid
                    new_row[temp_srnoIndex] = tsn
                    new_row[temp_prodTypeIndex] = tpt
                    if temp_infBatchIndex != -1 and tinf != None:
                        new_row[temp_infBatchIndex] = tinf
                    new_row[temp_lockIndex] = 'false'                    
                    new_row.append('forward')
                    old_data.append(new_row)
            
            upd_data = []
            for row in old_data:
            	did = row[temp_primaryKeyIndex]
            	if not (did in deleted_ids):
                    upd_data.append(row)
            
            new_sheet = pyexcel.Sheet(upd_data) #copy new data into a sheet
        else:
            old_data = format_data(old_book[oldsheet_name].get_array())[0]
            header = old_data[0]
            temp_srnoIndex = getkeyindices(header, [header_srno])[0]
            temp_primaryKeyIndex = temp_srnoIndex + 1
            
            #print(oldsheet_name, old_data, header, header_srno, temp_srnoIndex, temp_primaryKeyIndex)
            	
            upd_data = []
            for row in old_data:
            	did = row[temp_primaryKeyIndex]
            	if not (did in deleted_ids):
                    upd_data.append(row)
            
            new_sheet = pyexcel.Sheet(upd_data) #copy new data into a sheet
		
        new_sheet.name = oldsheet_name            
        new_book += new_sheet        
        new_book.save_as(filename)        
    return JsonResponse({'response': 'success',                          
                         })

@csrf_exempt
def get_sheets(request):
    global filename           

    book = pyexcel.get_book(file_name=filename)    
    sheet_name = request.POST['sheet_name']
    next_sheet_name = request.POST['next_sheet']
    print(sheet_name, next_sheet_name)
    	    
    new_book = pyexcel.Book()  #Creates a new book for the updated sheets
    sheet_data = {}    
    for sheet in book:
        data = sheet.get_array()
        name = sheet.name
        data, hidden_rows = format_data(data, name)     
        
        h_sheet_data = data[1:]
        h_header = data[0]
        	       	
        if len(h_sheet_data) == 0:
            h_sheet_data.append([''] * len(h_header) )
	        
        sheet_data[name] = {"sheet_name": name, "sheet_data": h_sheet_data, "header": h_header, "hidden_rows": hidden_rows}
	
        if sheet_name == sheet.name:        	
            new_sheet = pyexcel.Sheet(data)
            new_sheet.name = sheet_name
            new_book += new_sheet
        else:
            new_book += sheet

    print(present_locations);
    if not (next_sheet_name in raw_materials):            			
        header = new_book[next_sheet_name].get_array()[0]
        srnoIndex, presentLocIndex, lwIndex, wtIndex = getkeyindices(header, [header_srno, header_ploc, header_laser_welding[1], header_wt_result])

        primarykeyIndex = srnoIndex + 1

        if presentLocIndex != -1:            
            next_ids = new_book[next_sheet_name].column_at(primarykeyIndex)[1:]
            locs = [header_ploc]
            for next_id in next_ids:
                if next_id != '':
                    lw = ''
                    try:
                    	lw = present_locations[next_id]
                    except KeyError:
                    	pass
                    locs.append(lw)    

            new_book[next_sheet_name].set_column_at(presentLocIndex, locs)                
    	
        if lwIndex != -1:        	
            next_ids = new_book[next_sheet_name].column_at(primarykeyIndex)[1:]
            locs = [header_laser_welding[1]]
            for next_id in next_ids:
                if next_id != '':                	
                    lw = ''
                    try:
                    	lw = laser_welds[next_id]                    	                    	
                    except KeyError:
                    	pass
                    locs.append(lw)
            new_book[next_sheet_name].set_column_at(lwIndex, locs)

        if wtIndex != -1:
            next_ids = new_book[next_sheet_name].column_at(primarykeyIndex)[1:]
            locs = [header_wt_result]
            for next_id in next_ids:
                if next_id != '':     	                   
                    lw = ''
                    try:
                    	lw = wt_metal_results[next_id]
                    except KeyError:
                    	pass
                    if lw == '':
                    	lw = 'Not Done'
                    locs.append(lw)

            new_book[next_sheet_name].set_column_at(wtIndex, locs)
            
            
    new_book.save_as(filename)
    #print(sheet_data)
    return JsonResponse({'response': 'success', 'reload_data' : sheet_data})
                                         

def upload(request):    
    global filename, opened_sheets, present_locations, raw_materials, header_pdtp

    opened_sheets = []
    present_locations = {}

    book = pyexcel.get_book(file_name=filename)
    all_names = book.sheet_names()
    raw_materials = all_names[:6]
    return render(
        request,
        "dbt_app/handsontable.html",
        {"sheet_names": book.sheet_names()}
    )
