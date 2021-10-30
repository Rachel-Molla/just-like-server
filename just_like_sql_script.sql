create database if not exists just_like_db default character set utf8mb4 collate utf8mb4_0900_ai_ci;

show databases;

use just_like_db;

show tables;

create table if not exists user_accounts (
	uuid int unsigned not null auto_increment unique,
    user_name varchar(50) not null unique, 
    password varchar(255) not null unique,
    email varchar(100) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone_number int unsigned not null,
    linkedin_profile varchar(100) not null,
	permission_level enum( "admin", "task_manager" , "volunteer" , "junior" ),
    areas_of_interest SET( "job_search", "lecture", "workshop", "else" ),
    constraint PK_userId primary key (uuid)
);

select * from user_accounts;

create table if not exists departments (
	department_id tinyint unsigned not null unique,
	task_manager_id int unsigned not null auto_increment unique,
	department_type enum("community management", "junior training", "jobs"),
	constraint PK_department primary key (department_id),
	constraint FK_departmentTaskManager foreign key (task_manager_id) references user_accounts(uuid)
);

select * from departments;

create table if not exists department_membership (
	user_id int unsigned not null,
	department_id tinyint unsigned not null,
	primary key( user_id, department_id),
	constraint constr_departmentMembership_userId_fk foreign key userId_fk(user_id) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_departmentMembership_departmentId_fk foreign key departmentId_fk(department_id) references departments(department_id)
	on delete cascade on update cascade
);

create table if not exists projects (
	project_id int unsigned not null auto_increment unique,
    department_id tinyint unsigned not null,
	task_manager_id int unsigned not null,
	project_title tinytext,
    project_description text,
    number_of_tasks int unsigned default 0,
	number_of_tasks_finish int unsigned default 0,
    date_of_adding_project datetime,
    date_of_finish_project datetime,
    time_past_from_adding_project datetime,
    time_remain_finish_project datetime,
    constraint PK_project primary key (project_id),
    constraint FK_departmentProject foreign key (department_id) references departments(department_id), 
    constraint FK_taskManagerProject foreign key (task_manager_id) references user_accounts(uuid) 
);

select * from projects;

create table if not exists project_membership (
	user_id int unsigned not null,
	project_id int unsigned not null,
	primary key( user_id, project_id),
	constraint constr_projectMembership_userId_fk foreign key userId_fk(user_id) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_projectMembership_projectId_fk foreign key projectId_fk(project_id) references projects(project_id)
	on delete cascade on update cascade
);

create table if not exists tasks (
	task_id int unsigned not null auto_increment unique,
    department_id tinyint unsigned,
    project_id int unsigned,
    task_initiator_id int unsigned not null,
    task_manager_id int unsigned not null,
	task_type enum( "general", "design", "substance"),
    task_title tinytext,
    task_description text,
    preferability_level enum("urgent", "high", "medium", "low"),
    date_of_adding_task datetime,
    date_of_finish_task datetime,
    time_past_from_adding_task datetime,
    time_remain_finish_task datetime,
    task_status enum ("received", "waiting", "closed"),
	task_finish_status boolean default false,
    task_status_color enum ("blue", "green", "black"),
	constraint PK_task primary key (task_id),
	constraint FK_departmentTask foreign key (department_id) references departments(department_id),
	constraint FK_projectTask foreign key (project_id) references projects(project_id),
    constraint FK_managerTask foreign key (task_manager_id) references user_accounts(uuid),
	constraint FK_initiatorTask foreign key (task_initiator_id) references user_accounts(uuid)
);

select * from tasks;

create table if not exists task_team (
	user_id int unsigned not null,
	task_id int unsigned not null,
	primary key( user_id, task_id),
	constraint constr_taskTeam_userId_fk foreign key userId_fk(user_id) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_taskTeam_taskId_fk foreign key taskId_fk(task_id) references tasks(task_id)
	on delete cascade on update cascade
);

show tables;

-- Find all users registered for a project:
select user_accounts.* 
from user_accounts 
join project_membership 
on user_accounts.uuid = project_membership.user_id
where project_membership.prject_id = 1;
    
-- Find all projects taken part by a same user:
select projects.* 
from projects 
join project_membership 
on projects.project_id = project_membership.project_id
where project_membership = 1; 
        
create user admin identified by "the_secure_password";

grant all privileges on just_like_db.* to admin;

show grants for admin;

