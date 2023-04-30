from django import forms

from client.register.models import Shopping_Cart, Clients

class ShoppingCartForm(forms.ModelForm):

    class Meta:
        model = Shopping_Cart
        fields = ['product', 'amount']

class ClientsForm(forms.ModelForm):

    class Meta:
        model = Clients
        fields = ['full_name', 'email', 'picture_url', 'cpf', 'phone', 'birthday', \
        'gender', 'cep', 'street', 'street_number', 'complement', 'neighborhood', 'city', \
        'card']