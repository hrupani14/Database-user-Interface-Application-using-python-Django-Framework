from django import forms
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pyexcel
import json


filename = None

class UploadFileForm(forms.Form):
    file = forms.FileField()

@csrf_exempt
def save(request):
    global filename
    sheet_name = request.POST['name']
    json_data = request.POST['json_data']
    y = json.loads(json_data)
    data = y['hot_data']
    header = y['header']
    data.insert(0, header)
    
    book = pyexcel.get_book(file_name=filename)

    new_book = pyexcel.Book()   # Creates a new book to hold the updated sheets
    for sheet in book:        
        if sheet.name == sheet_name:
            new_sheet = pyexcel.Sheet(data)         
            print('new_sheet======>', new_sheet)
            #new_sheet.name_columns_by_row(0)
            new_sheet.name = sheet_name            
            new_book += new_sheet 
            
        else:
            new_book += sheet

    new_book.save_as(filename)
    return JsonResponse({'response': 'success'})


def find_non_empty_row(list):
  newdata = []
  for row in list:
    is_not_empty = False
    for cell in row:
      if cell != '':
        is_not_empty = True
        break
    if is_not_empty:
      newdata.append(row)
    
  return newdata

def upload(request):
    global filename, sheet_data
#    if request.method == "POST":
        #form = UploadFileForm(request.POST, request.FILES)

#        if form.is_valid():
            #filehandle = request.FILES["file"]
    filename = './ah.xls'# + str(filehandle)
    #sheets = filehandle.get_book()
    book = pyexcel.get_book(file_name=filename)
    sheet_data = {}
    for sheet in book:
    	sheet.name_columns_by_row(0)
    	data = sheet.get_array()
    	print('new_sheet======>', sheet.name, data)
    	name = sheet.name            	
    	non_empty_data = find_non_empty_row(data)
    	sheet_data[name] = {"sheet_name": name, "sheet_data": non_empty_data[1:], "header": data[0]}
               
    return render(
        request,
        "dbt_app/handsontable.html",
        {"data": sheet_data}
    )

#    else:
 #       form = UploadFileForm()
#
 #   return render(
  #      request,
   #     "dbt_app/upload_form.html",
    #    {
     #       "form": form,
      #      "title": "Excel file upload and download example",
       #     "header": "Please choose any excel file from your cloned repository:",
        #},
    #)
