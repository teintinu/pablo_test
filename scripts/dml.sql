create table employee_type (
	id serial NOT null primary key,
	name varchar(60) not null,
	salary int not null
);

create table shop (
	id serial not null primary key,
	name varchar(60) not NULL,
	address varchar(200),
	telephone varchar(20)
);

create table employee (
	id serial not null primary key,
	name varchar(60) not null,
	employee_type_id int4 not null references employee_type,
	shop_id int4 not null references shop,
	address varchar(200),
	telephone varchar(20),
	employment_date date not null
);