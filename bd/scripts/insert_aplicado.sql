/*Eliminando estrutura do banco de dados*/
drop table if exists CLIENTE cascade;
drop table if exists PEDIDO cascade;
drop table if exists CLIENTE_PEDIDO cascade;
drop table if exists PIZZA cascade;
drop table if exists PEDIDO_PIZZA cascade;
drop table if exists INGREDIENTE cascade;
drop table if exists PIZZA_INGREDIENTE cascade;

create table CLIENTE(
	cd_cliente SERIAL primary key not null,
	nome varchar(50) not null,
	senha varchar(50) not null,
	email varchar(50) not null,
	cpf varchar(11) not null,
	data_nascimento date not null
);

create table PEDIDO(
	cd_pedido SERIAL primary key not null,
	total_valor float not null
);

create table CLIENTE_PEDIDO(
	cd_cliente_pedido SERIAL primary key not null,
	fk_cd_cliente integer not null,
	fk_cd_pedido integer not null
);


create table PIZZA(
	cd_pizza SERIAL primary key not null,
	nm_pizza varchar(50) not null,
	preco float not null
);

create table PEDIDO_PIZZA(
	cod_pedido_pizza SERIAL not null,
	fk_cd_pizza integer not null,
	fk_cd_pedido integer not null
);

create table INGREDIENTE(
	cd_ingrediente SERIAL primary key not null,
	nm_ingrediente varchar(50) not null
);

create table PIZZA_INGREDIENTE(
	cd_pizza_ingrediente SERIAL primary key not null,
	fk_cd_pizza integer not null,
	fk_cd_ingrediente integer not null
);

alter table CLIENTE_PEDIDO
add foreign key(fk_cd_cliente) references CLIENTE(cd_cliente),
add foreign key(fk_cd_pedido) references PEDIDO(cd_pedido);

alter table PEDIDO_PIZZA
add foreign key(fk_cd_pizza) references PIZZA(cd_pizza),
add foreign key(fk_cd_pedido) references PEDIDO(cd_pedido);

alter table PIZZA_INGREDIENTE
add foreign key(fk_cd_pizza) references PIZZA(cd_pizza),
add foreign key(fk_cd_ingrediente) references INGREDIENTE(cd_ingrediente);


INSERT INTO ingrediente(nm_ingrediente)
VALUES ('tomate'),
	   ('ovo'),
	   ('cebola'),
	   ('palmito'),
	   ('bacon'),
	   ('calabresa'), 
	   ('frango'),
	   ('lombo canadense'),
	   ('mussarela'),
	   ('carne'); 

insert into pizza (nm_pizza, preco) 
	values  ('Marguerita', 30 ),
            ('Portuguesa', 30), 
            ('Calabresa', 30), 
            ('Frango c/ Catupiry', 30), 
            ('Lombo Canadense', 30),
	        ('Siciliana', 40), 
            ('Meatlovers', 40), 
            ('Red Gump', 40), 
            ('Queijo c/ Goiabada', 40), 
            ('Supreme', 30);



