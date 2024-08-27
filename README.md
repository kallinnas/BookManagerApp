# Angular / ASP.NET Core Web API CRUD controller presentation 

Description: This project is a full-stack book management application built using Angular 18 and ASP.NET Core 6. 
The frontend is designed with Angular Material and flex-layout to create a responsive user interface, while HttpClient is used for API communication. 
The backend is powered by ASP.NET Core 6 with an in-memory database, pre-seeded with 5 books as sample data.

Frontend:
Built with Angular 18.
Utilizes Angular Material for UI components.
Flex-layout for responsive design.
HttpClient for API interactions.

Three main pages:
Display Books: Lists all books with filters by status ("Available", "On hand", "Reserved") and a search function by book name.
Add Book: Page for adding new books.
Edit Book: Page for editing existing books.

Backend:
Developed with ASP.NET Core 6.
In-memory database for quick setup and testing.
CRUD operations supported via 4 controllers.
Additional controllers for getting books by ID and status.