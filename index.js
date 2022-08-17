console.log("University library");
import { book, updateUi } from "./classes.js"



// Add Book link operations
let addBookLink = document.getElementById("addBookLink");
addBookLink.addEventListener("click", operation)

function operation() {
    let formArea = document.getElementById("formArea");
    formArea.innerHTML =
        `<form id="addBookForm">
<div class="my-4 mt-5">
    <input type="text" class="form-control ps-5 rounded-0 border border-5 border-secondary" id="bookName"
        placeholder="Enter Book Name">
</div>
<div class="mb-4 ">
    <input type="text" class="form-control ps-5 rounded-0 border border-5 border-secondary" id="authorName"
        placeholder="Book Author Name">
</div>
<div class="border border-5 border-secondary ps-5 py-2">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="type" id="science" value="Science">
        <label class="form-check-label" for="science">
            Science
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="type" id="commerce" value="Commerce">
        <label class="form-check-label" for="commerce">
            Commerce
        </label>
    </div>
    <div class="form-check ">
        <input class="form-check-input" type="radio" name="type" id="programming" value="Programming">
        <label class="form-check-label" for="programming">
            Programming
        </label>
    </div>
</div>
<button id="addBookBtn" type="submit"
    class="btn btn-outline-success mt-5 mb-2 col-7 col-md-4 mx-auto rounded-3 border border-5 border-light fw-bold">Add
    Book</button>
    </form>`

    // Add Book submit btn operations
    let addBookBtn = document.getElementById("addBookBtn");
    addBookBtn.addEventListener("click", addBookSubmit);

    function addBookSubmit(e) {
        e.preventDefault()

        let bookName = document.getElementById("bookName").value;
        let authorName = document.getElementById("authorName").value
        let bookType;
        let science = document.getElementById("science");
        let commerce = document.getElementById("commerce");
        let programming = document.getElementById("programming");
        let text = "This book is added to the University library"
        let text1 = "Please provide correct details"

        if (science.checked) {
            bookType = science.value
        }
        else if (commerce.checked) {
            bookType = commerce.value
        }
        else if (programming.checked) {
            bookType = programming.value
        }

        // creating book object from class (book)
        let newBook = new book(bookName, authorName, bookType)

        // manupulate UI by using class (updateUi)
        let addBookUi = new updateUi();


        if (addBookUi.addBooKFormValidation(newBook)) {
            addBookUi.store(newBook);
            addBookUi.addBookSuccess(text);
            addBookUi.clearForm("addBookForm")
            bookRow()
            console.log(newBook);
        }
        else {
            addBookUi.addBookError(text1)
        }
    }
}

// issue Book link operations
let issueBookLink = document.getElementById("issueBookLink");
issueBookLink.addEventListener("click", operation1);

function operation1() {
    let formArea = document.getElementById("formArea");
    formArea.innerHTML =
        `
            <form id="issueBookForm">
                <div class="my-4 my-5">
                    <input type="text" class="form-control ps-5 rounded-0 border border-5 border-secondary" id="studentName"
                        placeholder="Student Name">
                </div>
                <select id="selectIssueBook" class="form-select rounded-0 border border-5 border-secondary ps-5" aria-label="Default select example">
                <option disabled selected>Select Book from Library</option>
                
                </select>
                <button id="issueBookBtn" type="submit"
                    class="btn btn-outline-danger my-5 col-7 col-md-4 rounded-3 border border-5 border-light fw-bold  mx-auto">Issue
                    Book</button>
            </form>
       `
    let selectBook = document.getElementById("selectIssueBook");
    selectBook.addEventListener("focus", booksToIssueList)

    function booksToIssueList() {
        selectBook.innerHTML = `<option disabled selected>Select Book from Library</option>`;
        for (let i = 0; i < localStorage.length; i++) {
            let chi = document.createElement("option");
            let val = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(val));

            if (obj.isIssued == false) {
                chi.setAttribute("value", localStorage.key(i));
                chi.innerText = `${localStorage.key(i)}`
                selectBook.appendChild(chi)
            }
            else {
                continue
            }
        }
    }

    // issue Book submit btn operations 
    let issueBtnSubmit = document.getElementById("issueBookBtn");
    issueBtnSubmit.addEventListener("click", issueBookSubmit)

    function issueBookSubmit() {
        let student = document.getElementById("studentName").value;
        let selectIssueBook = document.getElementById("selectIssueBook").value;
        let book2 = new updateUi();
        if (selectIssueBook !== "Select Book from Library") {
            let book1 = JSON.parse(localStorage.getItem(selectIssueBook))
            let text = "Book is Issued"
            let text1 = "Please provide Correct information"

            if (book2.submitBooKFormValidation(student, selectIssueBook, book1)) {
                book1.isIssued = true;
                book1.studentName = student;
                localStorage.setItem(selectIssueBook, JSON.stringify(book1));
                book2.clearForm("issueBookForm")
                book2.addBookSuccess(text)
                issuedBookRow()
            }
            else {
                book2.addBookError(text1)
            }
        }
        else {
            book2.addBookError("Please select a book")
        }


    }
}

// return Book link operations
let returnBookLink = document.getElementById("returnBookLink");
returnBookLink.addEventListener("click", operation2);

function operation2() {
    let formArea = document.getElementById("formArea");
    formArea.innerHTML =
        `<form id="returnBookForm">
    <select id="returnBook" class="form-select rounded-0 border border-5 border-secondary my-5 ps-5" aria-label="Default select example">
        <option disabled selected>Book Return to Library</option>
    </select>
    <select id="studentName" class="form-select rounded-0 border border-5 border-secondary ps-5" aria-label="Default select example">
        <option disabled selected>Student Name</option>
        
    </select>
    <button id="returnBookBtn" type="submit"
        class="btn btn-outline-success my-5 col-7 col-md-4 rounded-3 border border-5 border-light fw-bold  mx-auto">Return
        Book</button>
</form>
`
    let returnBook = document.getElementById("returnBook");
    returnBook.addEventListener("focus", abc)
    function abc() {
        returnBook.innerHTML=` <option disabled selected>Book Return to Library</option>`
        for (let i = 0; i < localStorage.length; i++) {
            let option = document.createElement("option");
            let ret = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(ret));
            if (obj.isIssued == true) {
                option.setAttribute("value", ret)
                option.innerText = `${ret}`
                returnBook.appendChild(option)
            }
            else {
                continue
            }
        }
    }

    let studentName = document.getElementById("studentName");
    studentName.addEventListener("focus",abc2)
    function abc2(){
    studentName.innerHTML=`<option disabled selected>Student Name</option>`
    for (let i = 0; i < localStorage.length; i++) {
        let option = document.createElement("option");
        let ret = localStorage.key(i);
        let obj = JSON.parse(localStorage.getItem(ret));
        if (obj.isIssued == true) {
            option.setAttribute("value", obj.studentName)
            option.innerText = `${obj.studentName}`
            studentName.appendChild(option)
        }
        else {
            continue
        }
    }
}

    let returnBookBtn = document.getElementById("returnBookBtn");
    returnBookBtn.addEventListener("click", returnBookSbmit)

    function returnBookSbmit() {
        let returnBookName = document.getElementById("returnBook").value;
        let studentName = document.getElementById("studentName").value;

        let returnObj = new updateUi();
        if (returnBookName !== "Book Return to Library" && studentName !== "Student Name") {
            let book = JSON.parse(localStorage.getItem(returnBookName));
            let obj = new updateUi();
            if (studentName == book.studentName) {
                book.studentName = null;
                book.isIssued = false;
                localStorage.setItem(book.bookName, JSON.stringify(book))
                obj.addBookSuccess("Successfull , Book is Returned into University Library");
                obj.clearForm("returnBookForm");
                bookRow()


            }
            else {
                obj.addBookError("error in return : Please provide Correct information")
            }

        }
        else {
            returnObj.addBookError("Please Select An Option")
        }
    }

}

// books in library btn operations
let bookInLibraryLink = document.getElementById("recordLink");
bookInLibraryLink.addEventListener('click', bookRow);

function bookRow() {
    let headRow = document.getElementById("thead");
    headRow.innerHTML =
        `
    <tr >
        <th scope="col">SNo</th>
        <th scope="col">Book Name</th>
        <th scope="col">Author</th>
        <th scope="col">Type</th>
    </tr>
    `
    let row = document.getElementById("tbody");
    let showobj = new updateUi();
    showobj.showBooks(row)
}
bookRow()

// issued books in library link operation
let issuedBookLink = document.getElementById("issuedBookLink");
issuedBookLink.addEventListener('click', issuedBookRow);

function issuedBookRow() {
    let headRow = document.getElementById("thead");
    headRow.innerHTML =
        `
        <thead>
            <tr >
                <th scope="col">SNo</th>
                <th scope="col">Book Name</th>
                <th scope="col">Issue To</th>
            </tr>
        </thead>
    `
    let row = document.getElementById("tbody");
    row.innerHTML = ""
    for (let i = 0; i < localStorage.length; i++) {
        let bookindex = localStorage.key(i);
        let book = JSON.parse(localStorage.getItem(bookindex))
        if (book.isIssued == true && book.studentName != null) {
            row.innerHTML +=
                `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${book.bookName}</td>
                <td>${book.studentName}</td>

            </tr>
            `
        }
    }
}



