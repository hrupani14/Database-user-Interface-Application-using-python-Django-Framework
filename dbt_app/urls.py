from django.urls import path, include
from . import views
from django.contrib import admin

urlpatterns = [	
	path('admin/', admin.site.urls),
	path('accounts/', include('django.contrib.auth.urls')),
    path('', views.upload, name='uplink'),
    path('save', views.save, name='save'),
	path('login', views.login, name='login'),
    path('add', views.add, name='add'),
    path('get_sheets', views.get_sheets, name='get_sheets'),    
]
