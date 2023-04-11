from django import forms

from client.register.models import Products, ProductCategory

class ProductsForm(forms.ModelForm):

    class Meta:
        model = Products
        fields = [ 'name', 'picture_url', 'description', 'resume', 'category', 'price', 'is_available']
        

class ProductCategoryForm(forms.ModelForm):

    class Meta:
        model = ProductCategory
        fields = ['category', 'description']