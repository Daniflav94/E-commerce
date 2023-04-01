from django import forms

from client.register.models import Shopping_Cart

class ShoppingCartForm(forms.ModelForm):

    class Meta:
        model = Shopping_Cart
        fields = ['product', 'amount', 'selected']