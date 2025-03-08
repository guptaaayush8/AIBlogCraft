
CREATE TABLE blogs (
    Id int NOT NULL auto_increment,
    Title varchar(255),
    Content TEXT,
    Author varchar(255),
    ShortContent TEXT,
    TimeUploaded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key (id)
);

INSERT INTO blogs (Title, Content, Author, ShortContent)
VALUES ('OpenShift', 'OpenShift is a popular open-source container application platform developed by Red Hat. It enables developers to build, deploy, and manage applications in a variety of environments, from on-premises servers to public and private clouds. OpenShift provides a powerful set of tools for application development, deployment, and management, including support for a wide range of programming languages, frameworks, and databases.
One of the key benefits of OpenShift is its support for Kubernetes, the popular container orchestration platform. OpenShift provides a robust set of tools for managing Kubernetes clusters, making it easy for developers to deploy and manage their applications at scale. Additionally, OpenShift provides a number of advanced features such as automated scaling, continuous integration and deployment, and integrated monitoring and logging, all of which help to streamline the development and deployment process.
In addition to its powerful development and deployment capabilities, OpenShift also provides a strong focus on security and compliance, ensuring that applications are built and deployed in a secure and compliant manner. This includes support for secure container images, network isolation, and role-based access control, as well as compliance with a number of industry and government standards.
Overall, OpenShift is a powerful platform for container application development and deployment, providing developers with a robust set of tools and features for building and managing modern applications at scale. Its focus on security and compliance, along with its support for a wide range of deployment environments, makes it an attractive choice for organizations looking to adopt container-based development and deployment methodologies.', 'Aayush Gupta', 'OpenShift is a container application platform that helps developers build, deploy, and manage applications on the cloud. OpenShift provides a scalable and secure platform for running containerized applications, with support for various programming languages, frameworks, and tools.');


INSERT INTO blogs (Title, Content, Author, ShortContent)
VALUES ('Ansible', 'Ansible is an open-source automation tool developed by Red Hat. It allows developers and system administrators to automate the configuration, deployment, and management of their IT infrastructure in a simple and efficient way. With Ansible, developers can define infrastructure as code in a declarative manner, using a simple YAML configuration language.

One of the key benefits of Ansible is its simplicity and ease of use. Unlike many other automation tools, Ansible does not require agents to be installed on target systems, making it easy to set up and get started with. Additionally, Ansible provides a wide range of pre-built modules for common tasks such as package installation, file manipulation, and service management, making it easy to automate a wide range of infrastructure management tasks.

Another key benefit of Ansible is its ability to manage infrastructure across multiple platforms and environments. Ansible supports a wide range of operating systems, including Linux, Unix, and Windows, as well as a variety of cloud providers such as AWS, Azure, and GCP. This enables developers to manage their infrastructure in a consistent and repeatable manner, regardless of the underlying platform.

Overall, Ansible is a powerful automation tool for managing IT infrastructure, providing developers and system administrators with a simple and efficient way to automate infrastructure management tasks. Its ease of use and support for multiple platforms and environments make it a popular choice for organizations looking to streamline their IT operations and increase efficiency.', 'Aayush Gupta', 'Ansible is a radically simple IT automation platform that makes your applications and systems easier to deploy and maintain. Automate everything from code deployment to network configuration to cloud management, in a language that approaches plain English, using SSH, with no agents to install on remote systems.');


