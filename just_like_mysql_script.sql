drop database just_like_db;

create database if not exists just_like_db;

show databases;

use just_like_db;

show tables;

create table if not exists user_accounts (
	uuid varchar(300) not null unique,
    password varchar(255) not null unique,
    email varchar(100) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone_number int unsigned not null,
    linkedin_profile varchar(100) not null,
	permission_level enum( "admin", "task_manager" , "volunteer" , "junior" ),
    areas_of_interest SET( "job_search", "lecture", "workshop", "else" ),
	area_of_specialization SET( "Software development", "UI/UX design", "Product management", "QA" ,"Other" ),
    registration_date datetime not null,
    constraint PK_userId primary key (uuid)
);

select * from user_accounts;

create table if not exists departments (
	department_id tinyint unsigned not null unique,
	task_manager_id varchar(300) not null unique,
	department_type enum("Strategy", "Guidance", "Design", "Community management"),
	constraint PK_department primary key (department_id),
	constraint FK_departmentTaskManager foreign key (task_manager_id) references user_accounts(uuid)
);

select * from departments;

create table if not exists department_membership (
	uuid varchar(300) not null unique,
	department_id tinyint unsigned not null,
	primary key(uuid , department_id),
	constraint constr_departmentMembership_userId_fk foreign key userId_fk(uuid) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_departmentMembership_departmentId_fk foreign key departmentId_fk(department_id) references departments(department_id)
	on delete cascade on update cascade
);

create table if not exists projects (
	project_id int unsigned not null auto_increment unique,
    department_id tinyint unsigned not null,
	task_manager_id varchar(300) not null unique,
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
	uuid varchar(300) not null unique,
	project_id int unsigned not null,
	primary key( uuid, project_id),
	constraint constr_projectMembership_userId_fk foreign key userId_fk(uuid) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_projectMembership_projectId_fk foreign key projectId_fk(project_id) references projects(project_id)
	on delete cascade on update cascade
);

create table if not exists tasks (
	task_id int unsigned not null auto_increment unique,
    department_id tinyint unsigned,
    project_id int unsigned,
    task_initiator_id varchar(300) not null unique,
    task_manager_id varchar(300) not null unique,
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
	uuid varchar(300) not null unique,
	task_id int unsigned not null,
	primary key( uuid, task_id),
	constraint constr_taskTeam_userId_fk foreign key userId_fk(uuid) references user_accounts(uuid)
	on delete cascade on update cascade,    
	constraint constr_taskTeam_taskId_fk foreign key taskId_fk(task_id) references tasks(task_id)
	on delete cascade on update cascade
);

show tables;
