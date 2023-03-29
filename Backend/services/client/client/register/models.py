from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class AbstractBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        
class User(AbstractBaseModel, AbstractBaseUser):
    email = models.EmailField('email', unique=True)
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_company = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_consumer = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=False)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
    
class UserSession(AbstractBaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='session_user')
    session_token = models.CharField(max_length=64)
    
class Clients(AbstractBaseModel):

    GENDER_MALE = "male"
    GENDER_FEMALE = "female"
    GENDER_OTHER = "other"

    GENDER_CHOICES = (
        (GENDER_MALE, "Masculino"),
        (GENDER_FEMALE, "Feminino"),
        (GENDER_OTHER, "Outro"),
    )
    user = models.OneToOneField('register.User',
                                on_delete=models.CASCADE,
                                primary_key=True,
                                related_name='consumer_name')

    full_name = models.CharField(max_length=250)
    picture_url = models.CharField(max_length=200, null=True, blank=True)
    cpf = models.CharField(max_length=15)
    alias = models.CharField(max_length=200, blank=True)
    whatsapp = models.CharField(max_length=15)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6,
                                choices=GENDER_CHOICES,
                                default=GENDER_OTHER)

    cep = models.CharField(max_length=9, null=True, blank=True)
    street = models.CharField(max_length=200, null=True, blank=True)
    street_number = models.CharField(max_length=10, null=True, blank=True)
    complement = models.CharField(max_length=300, null=True, blank=True)
    neighborhood = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)

    card = models.ForeignKey('register.ClientsCards', on_delete=models.CASCADE, blank=True, null=True, related_name='card_client')

    def to_json(self):
        return {
            '_id': self.pk,
            'name': self.full_name,
            'image': self.picture_url,
            'cpf': self.cpf,
            'alias': self.alias,
            'phone': self.whatsapp,
            'birthday': self.birthday,
            'gender': self.gender,
            'cep': self.cep,
            'street': self.street,
            'street_number': self.street_number,
            'complement': self.complement,
            'neighborhood': self.neighborhood,
            'city': self.city,
            'card': self.card
        }

class ClientsCards(AbstractBaseModel):

    MASTER_CARD = "mastercard"
    VISA_CARD = "visa"
    HIPER_CARD = "hipercard"
    BANRI_CARD = "banricompras"
    ELO_CARD = "elo"
    ALELO_CARD = "alelo"
    AMERICAN_CARD = "america_express"

    CARDS_CHOICES = (
        (MASTER_CARD, "Mastercard"),
        (VISA_CARD, "Visa"),
        (HIPER_CARD, "Hipercarde"),
        (BANRI_CARD, "Banricompras"),
        (ELO_CARD, "Elo"),
        (ALELO_CARD, "Alelo"),
        (AMERICAN_CARD, "American express")
    )

    consumer_name = models.CharField(max_length=200, null=False, blank=False)
    card_number = models.CharField(max_length=50, null=False, blank=False)
    cod_card = models.CharField(max_length=5, null=False, blank=False)
    expiration_date = models.DateField(null=False, blank=False)
    flag_card = models.CharField(max_length=20,
                                choices=CARDS_CHOICES,
                                null=False, blank=False)

    def to_json(self):
        return {
            'name': self.consumer_name,
            'card_number': self.card_number,
            'cod': self.cod_card,
            'expiration_date': self.expiration_date,
            'flag': self.flag_card
        }

class Products(AbstractBaseModel):
    name = models.CharField(max_length=200)
    picture_url = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=300)
    category = models.ForeignKey('register.ProductCategory', on_delete=models.CASCADE, related_name='category_product')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=False)

    def to_product_json(self):
        return {
            'id': self.pk,
            'picture': self.picture,
            'product': self.name,
            'description': self.description,
            'sub_ategory': self.subcategory.pk,
            'price': self.price,
            'is_available': self.available
        }

class ProductCategory(AbstractBaseModel):
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=200)

    def to_json(self):
        return {
            'id': self.pk,
            'name': self.category,
            'description': self.description
        }

class Sales(AbstractBaseModel):
    product = models.ForeignKey('register.Products', on_delete=models.CASCADE, related_name='company_sales')
    amount = models.CharField('amount', max_length=10)
    value = models.CharField('value', max_length=10)
    payment_complete = models.BooleanField(default=False)
    
class Shopping_Cart(AbstractBaseModel):
    @property
    def total(self):
        if self.selected:
            new_amount = self.amount * self.product.product_price
            return new_amount
        else:
            return 0

    @property
    def remove_item(self):
        amount_item = self.amount - 1
        return amount_item

    client = models.ForeignKey('register.Clients', null=True, on_delete=models.CASCADE, related_name='shopping_client')
    product = models.ForeignKey('register.Products', null=True, on_delete=models.SET_NULL, related_name='shopping_products')
    amount = models.IntegerField()
    selected = models.BooleanField()

    def to_json(self):
        return {
            'client': self.shopping_client.full_name,
            'product': self.product,
            'amount': self.amount,
            'selected': self.selected
        }

class Whishes(AbstractBaseModel):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGTH = 'higth'

    PRIORITY_CHOICES = (
        (LOW, 'Baixa'),
        (MEDIUM, 'Média'),
        (HIGTH, 'Alta'),
    )

    name_whishes_list = models.CharField(max_length=50)
    client = models.ForeignKey('register.Clients', null=True, on_delete=models.SET_NULL, related_name='whishes_clients')
    product = models.ForeignKey('register.Products', null=True, on_delete=models.SET_NULL, related_name='whishes_products')
    annotation = models.CharField(max_length=200)
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default=MEDIUM)
    amount = models.CharField(max_length=4)

    def to_json(self):
        return {
            'name_list': self.name_whishes_list,
            'conumer': self.client,
            'product': self.product,
            'annotation': self.annotation,
            'priority': self.priority,
            'amount': self.amount
        }
         
class ProductsRating(AbstractBaseModel):
    VERY_LOW = '1'
    LOW = '2'
    NEUTRAL = '3'
    GOOD = '4'
    VERY_GOOD = '5'

    RATING_CHOICES = (
        (VERY_LOW, '1'),
        (LOW, '2'),
        (NEUTRAL, '3'),
        (GOOD, '4'),
        (VERY_GOOD, '5'),
    )

    client = models.ForeignKey('register.Clients', on_delete=models.SET_NULL, null=True, related_name='rating_client')
    product = models.ForeignKey('register.Products', on_delete=models.SET_NULL, null=True, related_name='rating_product')
    rating = models.CharField(max_length= 5, choices=RATING_CHOICES)

    def to_json(self):
        return {
            'client': self.client,
            'product': self.product,
            'rating': self.rating
        }
   
class Pix(AbstractBaseModel):
    payer = models.ForeignKey('register.Clients', on_delete=models.CASCADE)
    txid = models.CharField(max_length=32)
    value = models.CharField(max_length=8)
    time = models.CharField(max_length=25)
    return_pix = models.ForeignKey('register.return_pix', on_delete=models.CASCADE)
    
class Return_pix(AbstractBaseModel):
    payer = models.ForeignKey('register.Clients', on_delete=models.CASCADE)
    _id = models.CharField(max_length=40)
    rtrid = models.CharField(max_length=40)
    values = models.CharField(max_length=8)
    status = models.BooleanField()