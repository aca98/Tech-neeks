PGDMP                         x            mydb    13.1    13.1      �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16487    mydb    DATABASE     i   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Serbian (Latin)_Serbia.1252';
    DROP DATABASE mydb;
                postgres    false            �            1259    16538 	   attribute    TABLE     �   CREATE TABLE public.attribute (
    id_product_attribute bigint NOT NULL,
    name text DEFAULT NULL::bpchar,
    value text DEFAULT NULL::bpchar,
    important boolean DEFAULT false NOT NULL
);
    DROP TABLE public.attribute;
       public         heap    postgres    false            �            1259    16591     attribute_idProductAttribute_seq    SEQUENCE     �   ALTER TABLE public.attribute ALTER COLUMN id_product_attribute ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."attribute_idProductAttribute_seq"
    START WITH 489
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16550    cart    TABLE     �   CREATE TABLE public.cart (
    id_cart bigint NOT NULL,
    amount bigint NOT NULL,
    id_product bigint NOT NULL,
    purchase_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0),
    user_email text NOT NULL
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16593    cart_id_cart_seq    SEQUENCE     �   ALTER TABLE public.cart ALTER COLUMN id_cart ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_id_cart_seq
    START WITH 64
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    16498    product    TABLE     3  CREATE TABLE public.product (
    id_product bigint NOT NULL,
    name character(100) DEFAULT NULL::bpchar,
    price double precision,
    image_count bigint DEFAULT 0,
    type character(100) NOT NULL,
    brand character(100) NOT NULL,
    deleted boolean DEFAULT false,
    discount bigint DEFAULT 0
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16566    product_attribute    TABLE     �   CREATE TABLE public.product_attribute (
    product_id_product bigint NOT NULL,
    attribute_id_product_attribute bigint NOT NULL
);
 %   DROP TABLE public.product_attribute;
       public         heap    postgres    false            �            1259    16589    product_idProduct_seq    SEQUENCE     �   ALTER TABLE public.product ALTER COLUMN id_product ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."product_idProduct_seq"
    START WITH 63
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �            1259    16579    productamount    TABLE     �   CREATE TABLE public.productamount (
    id_product_amount bigint NOT NULL,
    product_id_product bigint NOT NULL,
    amount bigint
);
 !   DROP TABLE public.productamount;
       public         heap    postgres    false            �            1259    16516    users    TABLE     �  CREATE TABLE public.users (
    last_name text DEFAULT NULL::bpchar,
    password text DEFAULT NULL::bpchar,
    gender text DEFAULT NULL::bpchar,
    email text NOT NULL,
    phone_number text NOT NULL,
    address text NOT NULL,
    register_date time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_activity time without time zone,
    authorization_ bigint DEFAULT 0 NOT NULL,
    name text DEFAULT NULL::bpchar
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    16538 	   attribute 
   TABLE DATA                 public          postgres    false    202   |%       �          0    16550    cart 
   TABLE DATA                 public          postgres    false    203   �6       �          0    16498    product 
   TABLE DATA                 public          postgres    false    200   
9       �          0    16566    product_attribute 
   TABLE DATA                 public          postgres    false    204   �<       �          0    16579    productamount 
   TABLE DATA                 public          postgres    false    205   7N       �          0    16516    users 
   TABLE DATA                 public          postgres    false    201   QN       �           0    0     attribute_idProductAttribute_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."attribute_idProductAttribute_seq"', 492, true);
          public          postgres    false    207            �           0    0    cart_id_cart_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cart_id_cart_seq', 71, true);
          public          postgres    false    208            �           0    0    product_idProduct_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."product_idProduct_seq"', 64, true);
          public          postgres    false    206            P           2606    16548    attribute attribute_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attribute_pkey PRIMARY KEY (id_product_attribute);
 B   ALTER TABLE ONLY public.attribute DROP CONSTRAINT attribute_pkey;
       public            postgres    false    202            R           2606    16555    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id_cart);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    203            L           2606    16506    product product_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    200            T           2606    16583     productamount productamount_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.productamount
    ADD CONSTRAINT productamount_pkey PRIMARY KEY (id_product_amount);
 J   ALTER TABLE ONLY public.productamount DROP CONSTRAINT productamount_pkey;
       public            postgres    false    205            N           2606    16652    users user_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (email);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            postgres    false    201            U           2606    16556    cart cart_product_idProduct_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT "cart_product_idProduct_fk" FOREIGN KEY (id_product) REFERENCES public.product(id_product) NOT VALID;
 J   ALTER TABLE ONLY public.cart DROP CONSTRAINT "cart_product_idProduct_fk";
       public          postgres    false    2892    203    200            V           2606    16653    cart cart_user_email_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_email_fk FOREIGN KEY (user_email) REFERENCES public.users(email) NOT VALID;
 A   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_user_email_fk;
       public          postgres    false    203    2894    201            Y           2606    16584 &   productamount fk_ProductAmount_Product    FK CONSTRAINT     �   ALTER TABLE ONLY public.productamount
    ADD CONSTRAINT "fk_ProductAmount_Product" FOREIGN KEY (product_id_product) REFERENCES public.product(id_product);
 R   ALTER TABLE ONLY public.productamount DROP CONSTRAINT "fk_ProductAmount_Product";
       public          postgres    false    2892    205    200            W           2606    16569 1   product_attribute fk_product_attribute_Attribute1    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT "fk_product_attribute_Attribute1" FOREIGN KEY (attribute_id_product_attribute) REFERENCES public.attribute(id_product_attribute);
 ]   ALTER TABLE ONLY public.product_attribute DROP CONSTRAINT "fk_product_attribute_Attribute1";
       public          postgres    false    202    204    2896            X           2606    16574 /   product_attribute fk_product_attribute_Product1    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT "fk_product_attribute_Product1" FOREIGN KEY (product_id_product) REFERENCES public.product(id_product);
 [   ALTER TABLE ONLY public.product_attribute DROP CONSTRAINT "fk_product_attribute_Product1";
       public          postgres    false    204    200    2892            �      x��]�r���)�&�B���I2�%�T	���ZrW�`�;��.,㔛O>���1/�y�C�I�3 �� �JU��?ۘ�������l���[vr����ۋ��<J��6m����m\۬�l����!���騅L9�u�V�Sv���7'�'g߱�_o_����x�r�8`�=9no~7Uʊ�b�>�?�?��I��_����>0�&w<yo�MGl�ֵm��EG˲ �y]�׿V�`�i���
x�m���nT茲�43դ��N�y3��0g�Q{�9��{�S$#���)j��V���~����LSg˻�$c��+[5��l��Z�ᑼo�GifK�a�ތo�
kX$\�Ou^L��L?2��{�$/��!��v��[�fj'��J�(C�����'�8��j���G�sD��\�a������:KY�7��e�۴ߚ�Y�ee�e��/a�Ϫu#�i���eqw�����+��aY�v�cS����)5��D"�1���Z���/��9��0�<	y�I�e��{���,���0F�J���A�׹ŲE?����-X�-���	t�D���)��1!!�D;��q��G�(�x&�}x潹��Oʼ�M��n���X����4��L�
�y�bh8+��+BM\�=Ba��^���y���c��lܿ���M�~6����l�_��23���WS e�#?��4����F|��߿�Wi�a�XK�Ľ���h��{7���N[6KXS��ύi��7���x;(ǘ1	YGD�)����?���Wls�T��	�����h��e���f���j�g%�����o�Y�W�Ŋ5[#y��b�;�ޤ�j�����5o�lj�C\̑���E�Tx���g1ݞ�f���5n�$���o�3	���C��a��P�N��x�Y���4,�,TL�
��%�������RD*	�	-�B:�^L�5%�ڀt���4_t�жa8�i�i@3���L�8����	;(`�+ �R3E�|bO�ˇe^O���1?��������,eW���g��E޴l���^�s�1wv��շ��ޘ�	0pB�y��yH�G���F���A�Ŵ�.xNb<s���>\�����L�x�X�Ti����s-$ǚ�<�"F��>��ů�n݈��~P�iؓχc���UC��"$�]!�;�!G�&aO~�<����׼��ڎ��2O��M(��l��yq�F`B©"�ӈ
g�C��\�.Z �`��S�5��\p��m�\ �L��3�%̌a�q���Ĕ�pD;��Pe ӣ���?��#	C�9��p?�y��y�ykJa"��9�̃90��y䎍�lj��U��ǽ��%_˒�+���7i�4d�fz�Y>K�f��d5+t�L'�������?B���__�0y�ͬ
L���[g_zU�2��P���[4�l>6���L���2�#���f�&���򈽻�����
,׎:8��63�]�O�K����%ܠ�q�;6W��o�p^]��.Z�.��}�C[ ��?6�4p����=���;͋vu���q+��㾥+k3� ;W^�+���8m̅��O�oX�O�Ǝalm�_X[�ҺWk�Q��9d�G�σ&u�Y���aD'F�d�~�l�}L1�HzB6�l��%�>�N(GsE�L'�C���0�d#h��`��X�F��g�	�O�/��'۳�4^�X��Yc�w��d�Dr�KN7iL�ޤ1q���S�ʹ��J z�c�I��f����$��O��]��5��x�6lD�f��gXk����1��
�}f�&�2�?����!�@,���)��&��ȼ�d�@ �8J�Y^��i��,৚&on9f�]�R��,m�������p�'d���
1�b-]��0D%�=U-��R��;"C2ƲG�'�RV�H��iWh�|a�H�����k]�=�-�R�3�W��P]P�Bqt�$��I/�[k������R�/�h�QO� ��޴b��^�s����1���
���י{���¸���c4W��/�_$w%P8^	�8A����U��mc+[��{�:�:̿��`�&@A��:/s���u:��%#s�{e�voMٱ-���d�^�pZ{��@��f<��v7�~B�Cf�(����f'���[殔��hG���Sp�y?A�������)��,"�9Ժt��$@*2BJ��t��L��H��V(I�V�ـքEz��F����e:C��0��]�Z!��^BO�����$\����H����ս�^^����k�7+�8F�ʠOR�W�B�0����� ���{\��+�M����{��r�cS�͵�6u^�p��1�O�$����9 ��6�%�\�TSe��4�^~ѕ{�EDx����q���:8-?�5�)%o�t
EʐL�H�O(L�/ `R���u�Լ�a���;c;ɳv(�c[6���k��������+���z���<��\�b���i��GT���vP�gs}�nh����"�����LI��� VX��VXHƋ�i �h���s<���I	X-4����������7�[0np���"b�;N�ł0����;~�w�'�Z��D|�1y���*Ĉ�y�c�"D�&���g��W!
��!"���v��h�̫��Wz�N�U{��Ӕ�
��O8��2,5ʧ�dfd\WY������E����ng�8�HT+��fWB�Ѵ��SR_&��W�x��[�(ڼ�������byb�����y�:�@�7Łh$DqR�@�w�1��_�E)	L�G8�6�	G8�U��LS���+�^��S죥�:qY
[�º�X�ڎ+�] �Xk��5�b?i�Z�PI���DtY�������t�]&Q�[)A�[(A�[(A�΢d�,*A�΢��Zc)/1��x�DJ�0y�D�	������	:Ḑ�]9��x�i%��9��s� +0�d_{���!Ćgʫ�wu���:Q(/:_W�s���Z}���n�����c�Md�'�g��{�g�|����u���1V�mk�N��GV�"|ն:	��Q��VU_�E"lU����h10�6�]�͢�&��%�1��4K��π\KPy�8Q
�p�8,�_����5#�e��0�������%�@Fw���8-��\d�,B�k�Pp; S�V��۔��+�_p�+.��齮9�7���:b��z@�u�2��aSuF�)�SAG�wKY��i�z]7��*�Ĥ�*���#p�P�4~�	������y$�!�>��k�	U�S!�`sH'��	6�"ب'،�o��7�Se��u�_��%���He��D��"�u;�Y�!��j��\�DI��Drc����85��Pku�d�;��w�!�AV��X_tE�/���k"�ҋ�i�J���*���A>�U�`6/5�z��s=6��WgSţ�2M�za��$s�W�AyI��4^�\�W]v�g�~����~1"�g�!6�Q^�L�/��&����S
����O�Cv�^��a�~�m���FpO�Fҡq$��@�H�Xs�.�М���Q )�=h�I<���84�W�Os��5���h��&�ԴT�aj�'w���L��^F�*2h������cZ��$v��ı�\%�x���Jh�-������/W���*iA�Ɔ�56��r?�fh٭ŷh#�O4ҭ�t�fh�_5�H`���h�k�.npIK��1��WzOK������NЊ�:A+R��zJ�p�۟���o��E���ї�iE�۩V��N�Uu�j�4F��մ�]S�����K�Q����{��M>a���X�5�)�=�^�|X�p�R:�6����yW;3Ю̲�O����Z<��޴�cK�X	�Z��$c^P�R��\D\�RDXsH�&c��B#c^,MJa��.z�BGW���a��j"8��Y�Cph��>�	;(`�. ��3E�KY�,<W~h{9��m����ե�:-m�γ�N���Hx[O��c3��u��m���q�l�׍����e��j��[V���f-\ K�Ȱ�*`m1¡�W_���S�!vG#!)   ��Jp
��W�� �^�}B����o���t=�����tf�^��@ù"�p�Mvst�Tx΄p#Gwә�X�_��n�8FK�a�!X�B�wK@����P�@�'M����35W����H�PD2�a���e�s��@��F���x����s�lȭ#*I�Drk��uD2I�Kȷ���.x��ۚ9����#����ɬ��n����s5J'�Y[����;6�pOcڕ'a����r���^��9=vW�c@����j�^;���sV�̀�Q�������      �   U  x���M��0�;��7v%X�c;��K+UH-+]�'�h��/��_'Nw�{l���zd&�d��l1�/�t�|$���*
{<��j�j.F�n���}�/���.���>��\�����TW��V�{��4�ϧ���/d�c��|#O��~�����F��#2
t��a�a�H1t_�M��dwk{��w��y�R�������vx�a0��j��A5�4V5���f87@Ѳ5��-�a�eV���*���0j`a�cfF�1Y�NujG}uB����I՛��W'�۩����]�������l����yb�p�l�ڃ�h;��"����E��}�x�����}��;U��-�;e���u��)���Ewl�"����'��GBbl�qdj��;�L��U,I��Z
op�X��vˮQ���݌�Rsw�R���D��D��e��;4��n�^��y,���U,���u,�q���� ����k�bw���,�����9#�"6g�=�]������G*4GY`� �0��I&o���9�w��by����E��eЖ��甽;�_O~{[��U�N};^tμ�)�<О'kv'h4�����,�      �     x���r�@����.:#_~0�Z�U��ů�d�n���ڙ>D�/ҫ潺�MjG�a�s��x���a�`���=�Z����d<�4���b0��xx�>.A�Oi	f�x���SDo�"`#�3v�6�a	�tB�49���"8c�n� }��6tP���>	$���6�Q�@!�,��:(`�k
`4F�N�"�3�rEQJ ������À���^bd����K��s�Ob�A���/�7g*'3l�]�@���!X�l�c:7
��	�ͩ��"p�0{�I4�������0-g�t�,��2s�4�i��i�h�aM�"�'sF�F��ehWd�Ʃ�#����}��,�ȟO�;j��9Q��-
�+-�NZ|�t���koN�Vv������??�߯X�8�j�"�K���|
�71j�P�P�1岁l��,]��\���Y�#��ny�l�%>�7Y$e�t�,���UY���:�!:�p��3��ycN�5/s���������e!{�&�ҍ��2τwM�Ӂ�7�[�F�@}0LNP���Uw�\�F��,�<�B*0��4��l#�{7��)���Xn�W�Y#}�,�<�B*��6+.R%��D�L0��g�%���dd�66�W�D��[%e�t�,���d�=�&�~�F�c��*`�i��l�m��<��](��T�S.IY�t�,����/}��p�R4���\/a�4�6HE��㔯v1Y��#��I���v��1��7=�u���M��8Ul#��O���w�Ki)G�VO��j�>�����O�^�}���n��r1�`���| ���*�f��d��kgmc�������nK�P��d������W�C���"�s�g=�؇��!
�� ��V����ӵ�T������%��$      �      x���͊����y�*���ۻ�ȁ���5S��AC "��o���I����\T�w��z\�����n����o�~�ׇ_������闏?�����?����?o_���>���������������;_����_������r{��/���=�h�к����Zo�zܡ�
�Z�؍��v����x�n<a7��O؍'��v�	��D�8�B��B��B��u#u#u#u#u#u#v�v�v��uc��nlw׍��]7����vw�����uc��n�c�n������������������������������l���ʂ?ׁz��z��z��z��z��z��z��z��q�n��'��	�q�n��'��	�q�n��'�ƅ��u#u#u#u#u#u#u#u#uc,�Kɂ�P��,��Kyu#u#u#u#uc,�K�B��B��B�Ȃ�P��,��Kɂ�P����.%vC�R�`7�.%vC�R�`7�.式e�1֎v)�2�X��ƲL7�e��,Ӎe�n,�tcY�;ڥd�]ʲ`7�.eY�h��,��K9_�B��B��B�kC��B��B��B��B��B�Ȃ��`76؍vc���a7v؍vc���a7v؍v�E������6�F�F�F�F�F�F�F�F��Xh/�,��]�ڋ.v�E�����˂ݸ`7�^tY�h/�,��]��>�F�F��Xh/�,ԍ,ԍ,ԍ,ԍ,ԍ,��]�ڋf���`7�^tY��X�Y�Y�Y�Y�Y�c���P7�P7�`7�^tY�h/�,���r�8�^4�u�P{�,׍C�E�P7αP7�P7�P7�P7�R{�,ԍ,ԍ,ԍ,ԍ,��͂�P{�,��͂�P{�,��͂�P{�,����B�K�E�P7�P7�P7�P7�P7�P7�P7�`7�^t,�͂�P{�,��͂�P{�,��͂�P{�,��}���������������������1օ���������Y�j/�����Y�j/:�ڋf�n��h�ڋf�n���~��БT��F�_��n��n���P�0*�47�$7�7���CE�Z�S�(Wt5::������Y��B׿f��_����Y���,t�k��5]�����/v�/v�/v]��5}�Y�[K=q����,�-g�o9}�Y�[�BȂ�PO�e�n\�ꉻ,ԍ},ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ��wY�Y�ꉻ,���]�z�.vC=q7�z�.vC=q�����˂�PO�u���������9/�F�F�F�F�F�F�z�.v]Yr4�p��Е%�r��Е%�r��Е%�r��Е%�B�8�B�]Y�,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,�4=s��~�,�s��4zY��Y��Y��Y��Y��Y��Y��Y�j�2�ڥd�n�]J�ڥd�n�]J�ڥd�n\�ϱP7�P7�P7�P7�P7�P7�P7�P7�P7�R��,��Kɂ�P����P7�P7�P7�P7�P7�R��,ԍ,ԍ,ԍ,��Kɂ�P��,��KK�R�`7�.%vC�R�`7�.%vC=�s]�����S:Y�
�,t�S��)]ᔅ�p�BW�e��߲\7v���X�)�,���N�zJ'vC=��:�F�F��X�)�,ԍ,ԍ,ԍ,ԍ,ԍ,���N�zJg,��N�zJ'vC=������ɂ�PO�d�n��t��P7�P7�P7�P7�P7�P7�P7�P7�P7�RO�d�n��t�`7�S:Y��)�,���N������ɂ�PO�d�n��t�P7��P7�P7�P7�RO�d�nd�nd�nd�nd�nd�n���`7�^4�E������B�8�B��B��B��B��B��B��E�����������˂�@{�e�n��h��ơ��Y��ڋf�nj/���q������������1�ڋf�nd�nd�nd�nd�n��h�ڋf�n��h�ڋf�n��h�ڋf�n���5��Xj/��������������������������c��h�ڋf�n��h�ڋf�n��h�ڋf�n���c,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ�.ԍ,ԍ,��͂�P{�,��͂�P{ѱ�^4vC�E�`7�^4v�E��冎���o0
�Mw�Lv�Lu�B�QQ��Q&�Q��Q��*���BE�Z�3��б�q�'��͒?��5]�����B׿f��_����Y���,tm�X�|Y��|Y��|Y�����毑�[�B��Xꉻ,�-g�o9}�Y�[�B�r�3@�z�.v��PO�e�n�c�nd�nd�nd�nd�nd�nd�n�����B�Ȃ�PO�e�n�'�`7�wY�ꉻ��wY�ꉻ,���]�z��Pԍ,ԍ,ԍ�yQ7�P7�P7�P7�P7�P7�`7�wY��ʒ�ц�Ɔ�,Y��Ɔ�,Y��Ɔ�,Y��Ɔ�,Y��9��X�ʒe�nd�nd�nd�nd�nd�nd�nd�n����l�se������B=�B=�B=�B=�B=�B=�B=̂�P����.%vC�R�`7�.%vC�R�`7�.%v�B�x���������������������������1�ڥd�n�]J�ڥ����������������1�ڥd�nd�nd�nd�n�]J�ڥd�n�]�Xj����v)Y�j����v)Y��)��X�
��֮���BW8e�+���NY�
�,t�S��-]��庱��t�RO�d�n��t�`7�S:Y��)�ױP7�P7�P7�RO�d�nd�nd�nd�nd�nd�n��t�`7�S:c��t�`7�S:Y��)�,���N�zJ'vC=�����������������������������1�zJ'vC=������ɂ�PO�d�n��t�`7.���N�zJ'vC=��������������1�zJ'u#u#u#u#u#v�E�����Yh/�,��]��1�F�F�F�F�F��Xh/�,ԍ,ԍ,��]�ڋ.vC�E�\7��r�8�^4�u�P{�,ԍs,ԍ,ԍ,ԍ,ԍ��^4u#u#u#u#vC�E�`7�^4vC�E�`7�^4vC�E�`7�^4vC�E��P7�R{�,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,��K�E�`7�^4vC�E�`7�^4vC�E�`7�^4vC�Ec�nd�nd�nd�nd�nd�nd�n�u�nd�nd�n��h�ڋf�n��h�ڋ����Y�j/�����Y�h/�/7t$e~�Q�h�e�e�;:��2͍2ɍ2ōr�@�PQ��*���A����k>at�k������Y���,t�k��5]�����B�Fg�k��B��˂�@��˂�@��˂�@G��6�D�r���RO�e�o9}�Y�[�B�r���П�`7�wY��z�.ucu#u#u#u#u#u#uc,��]�F�z�.vC=q�����˂�PO܍���˂�PO�e�n�'�`7�w��nd�nd�nt΋���������������������˂�@W��6\76teɲ\76teɲ\76teɲ\76teɲP7αP7�BW�,u#u#u#u#u#u#u#v�D�ǜe��+�\�?�^�a�a�a�a�a�a�a�ڥ��v)Y�j����v)Y�j����v)Y���s,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ��.%vC�R�`7�.�m,ԍ,ԍ,ԍ,ԍ,ԍ��.%u#u#u#vC�R�`7�.%vC�R�R��,��Kɂ�P��,��Kɂ�PO���BW8}�v��N��)]ᔅ�p�BW8e�+����oY��,׍]=�3�zJ'vC=������ɂ�PO鼎��������1�zJ'u#u#u#u#u#vC=������K=������ɂ�PO�d�n��t�`7�S:Y��)�m,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ,ԍ��S:Y��)�,���N�zJ'vC=���q�n��t�`7�S:Y��)�,ԍ},ԍ,ԍ,ԍ��S:Y�Y�Y�Y�Y�Y�h/�,���B{�e�n���P7��P7�P7�P7�P7�P7�P7�B{�e�nd�nd�n���`7�^tY�j/��q��h��ơ��Y� �  �ڋf�n�c�nd�nd�nd�n����Y�Y�Y�Y�Y�j/�����Y�j/�����Y�j/�����Y�j/z���1�ڋf�nd�nd�nd�nd�nd�nd�nd�n���Xj/�����Y�j/�����Y�j/�����Y�j/�u#u#u#u#u#u#uc�u#u#vC�E�`7�^4vC�E�`7�^t,�͂�P{�,��͂�@{��x��#�(����@��(��(Sݡ�aT�in�In�)n��:��r�@�PQ��j(t,t\�	��_��υ��B׿f��_����Y���,t�k�6:]=:&_�:&_�:&_�:�>��k$���з<�z�.}�Y�[�B�r���з��������˂ݸ`7�wYӍw�� ���      �   
   x���          �   [  x�ݖIn�0��>wN �T7M�,�&.P����*�5����M�{���\Ē��+�C?g�Ϗ?/WW_nQ��������J�Z���n֥(���D]�t�L�����P94<T�\����T�4ղ��e��F�u*ngI�Z���n����Y4�*�2k�����W+t6�zS�*�;h�	5�����e�H���,�H��Թ>�����0�Dj4�#ϵ�ܽ�P������xr �����a�Ѝc��'-e[u�{,b����/S�'� +E�:�A�~z�.e�i[�̫d��8p�����X�A�'��������v��������7h`u�ד? od���قy��s�-��Ĝ/r��x�A���g��/^���s������@8@	F����~�ק e��o�<
E���ˆR�� BnQ��^1�2��_}i���-CɈ����i��[�EN0���� ��){᜝G��s�v��e�4��C���A!�#�/�ʼ`����.�*�>ʧ�����vO��Q�ނp������a�\��id݌�0x���l�������,B:^E��L��oC�H:     