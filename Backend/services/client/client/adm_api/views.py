from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import IntegrityError
from django.db.models import Q
from django.conf import settings

from client.register.models import *

from .utils import _create_token
from .forms import ProductsForm, ProductCategoryForm

@csrf_exempt
def create_new_product(request):
    data = request.POST.copy()

    if data['name']:
        try:
            product = Products.objects.get(name=data['name'])
            form = ProductsForm(instance=product, data=data)
        except Products.DoesNotExist:
            form = ProductsForm(data=data)
        
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Produto adicionado com sucesso', 'status': 200})
        else:
            print(form.errors)
            return JsonResponse({'message': 'Erro ao salvar o produto', 'error': form.errors, 'status':404})
    
    return JsonResponse({'message': 'Erro ao adicionar o produto', 'status': 400})

@csrf_exempt
def edit_product(request, pk):
    name = request.POST.get('name', None)
    description = request.POST.get('description', None)
    category = request.POST.get('category', None)
    price = request.POST.get('price', None)
    is_avaliable = request.POST.get('is_avaliable', False)
    
    if is_avaliable == 'true' or is_avaliable == 'True':
        is_avaliable = True
        
    if pk:
        if category:
            category = ProductCategory.objects.get(pk=category)
        product = Products.objects.get(pk=pk)
        product.company = request.user.company
        product.name = name
        product.description = description
        product.category = category
        product.price = price
        product.is_avalable = is_avaliable
        
        product.save()
        
        return JsonResponse({'message': 'Produto alterado com sucesso', 'status': 200})
        
    return JsonResponse({'message': 'Produto inválido', 'status': 400})

@csrf_exempt
def create_product_category(request):
    category = request.POST.get('category', None)
    data = request.POST.copy()
    print(data)
    print("oi")
    if category:
        print(category)
        print(category)
        try:
            cat = ProductCategory.objects.get(category=category)
            form = ProductCategoryForm(instance=cat, data=data)
            if form.is_valid():
                form.save()
                return JsonResponse({'message': 'Categoria adicionada comsucesso', 'status': 200})
        except ProductCategory.DoesNotExist:
            form = ProductCategoryForm(data=data)
            if form.is_valid():
                form.save()
                return JsonResponse({'message': 'Categoria adicionada comsucesso', 'status': 200})
            else:
                print(form.errors)
                return JsonResponse({'message': 'Erro', 'status': 400})
    return JsonResponse({'message': 'Informe a categoria', 'status': 400})