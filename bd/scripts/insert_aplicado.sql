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

insert into pizza_ingrediente(fk_cd_pizza, fk_cd_ingrediente) 
values 	(1,1),
  		(1,2),
		(1,12),
		(1,14),
		(2, 1), 
		(2, 2), 
		(2, 3), 
		(2, 6), 
		(2, 9), 
		(2, 12), 
		(2, 15), 
		(3, 1), 
		(3, 2), 
		(3, 6), 
		(4, 1), 
		(4, 2), 
		(4, 4), 
		(4, 13), 
		(5, 1), 
		(5, 2), 
		(5, 8), 
		(6, 1), 
		(6, 2), 
		(6, 4), 
		(6, 5), 
		(6, 7), 
		(6, 12), 
		(7, 1), 
		(7, 2), 
		(7, 5), 
		(7, 10), 
		(7, 12), 
		(8, 1), 
		(8, 2), 
		(8, 4), 
		(8, 12), 
		(8, 13), 
		(8, 16), 
		(9, 2), 
		(9, 11), 
		(10, 1), 
		(10, 2), 
		(10, 3), 
		(10, 4), 
		(10, 5), 
		(10, 6), 
		(10, 7), 
		(10, 12);




