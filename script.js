const books = document.querySelector(".bookstore__books__book-list")
const submit = document.getElementById("add-book")


submit.addEventListener("click", (e)=>{

    console.log("this works")
     e.preventDefault()

     //get values from input form.
   let newTitle = document.getElementById("title").value;
   let newAuthor = document.getElementById("author").value;
   let newImageUrl = document.getElementById("image").value;
   let newPrice = document.getElementById("price").value;
   let newStatus = document.getElementById("status").value;

   //create new list-item 'newBook'.
   let newBook = document.createElement('li');
   newBook.classList.add("book");

   // element for image.
    let image = document.createElement("img");
    image.src = newImageUrl;
    image.alt = `Front-Cover of the book, ${newTitle}`;

    //container for book details.
    let details = document.createElement("div");
    details.classList.add("book-details");

    let title = document.createElement("div");
    title.classList.add("book-details__title");
    title.textContent = formatNameAndTitle(newTitle);

    let author = document.createElement("div");
    author.classList.add("book-details__author");
    author.textContent = formatNameAndTitle(newAuthor);

    let status = document.createElement("div");
    status.classList.add("book-details__status");
    status.textContent = getStatus(newStatus);

    let price = document.createElement("div");
    price.classList.add("book-details__price");
    price.textContent = `$${formatPrice(newPrice)}`;


    //Helper functions to format form inputs
    function formatPrice(input){
        if(!input.includes('.')){
            return input + ".00";
        }
        return input;
    }

    function formatNameAndTitle(input){
        return input.split(' ').map(ele => {
           return ele[0].toUpperCase() + ele.slice(1).toLowerCase()
        }).join(' ');
    }

    //helper function to determine status input from the form and style appropriately
    function getStatus(input){

        if (input === "in-stock"){
            if(status.classList.contains("out-of-stock")){
                status.classList.remove("out-of-stock")
            }
            status.classList.add("in-stock");
            return "In Stock";
        }
        else if (input === "out-of-stock"){

            if(status.classList.contains("in-stock")){
                status.classList.remove("in-stock");
            }
            status.classList.add("out-of-stock");
            return "Out of Stock";
        }
        
    }

    // combine elements of book details
    details.appendChild(title)
    details.appendChild(author)
    details.appendChild(status)
    details.appendChild(price)

    // add trash icon
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-regular", "fa-trash-can");
    trashIcon.classList.add("trash")

     //add functionality to trash icon
    trashIcon.addEventListener("click",(e) => {
            books.removeChild(newBook);
    })



    newBook.appendChild(image);
    newBook.appendChild(details);
    newBook.appendChild(trashIcon);
    
    books.appendChild(newBook);
    
    saveBooks();
})

function saveBooks(){
    localStorage.setItem("data", JSON.stringify(books.innerHTML));
}

function showBooks(){
    books.innerHTML = JSON.parse(localStorage.getItem("data"));

    const trashIcons = document.querySelectorAll(".fa-trash-can");
    trashIcons.forEach(icon => {
        icon.addEventListener("click",(e) => {
        let removed = e.target.closest(".book");
        books.removeChild(removed);
        saveBooks();
        })
    });
}



showBooks();
