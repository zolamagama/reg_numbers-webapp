create table town (

	id serial not null primary key,
	town_name text not null,
	starts_with text not null

);


create table reg_numbers (
	id serial not null primary key,
	registration text not null,
    town_id int not null,
	foreign key (town_id) references town(id)


);


insert into town (town_name, starts_with) values ('Cape Town', 'CA');
insert into town (town_name, starts_with) values ('Paarl', 'CJ');
insert into town (town_name, starts_with) values ('Bellville', 'CY');



