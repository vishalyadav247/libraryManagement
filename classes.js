// book object class
class book {
    constructor(bookName, authorName, bookType) {
        this.bookName = bookName,
            this.authorName = authorName,
            this.bookType = bookType,
            this.isIssued= false,
            this.studentName=null
    }
}

// UI operations
class updateUi {

    // function to add a book into localStorage
    store(book) {
        localStorage.setItem(book.bookName, JSON.stringify(book));
    }

    // To clear all forms
    clearForm(id) {
        let formClear = document.getElementById(id);
        formClear.reset()
    }

    // To validate the input of addBook form
    addBooKFormValidation(book) {
        if (book.bookName.length < 3 || book.authorName.length < 3 || book.bookType == undefined) {
            return false
        }
        else {
            return true
        }
    }

    // To validate the input of addBook form
    submitBooKFormValidation(student,selectIssueBook, book1) {
        if (student.length > 3 && book1.isIssued == false) {
            return true
        }
        else {
            return false
        }
    }

    // alert to show that book is added successfully
    addBookSuccess(text) {
        let message = document.getElementById("message");
        let str = `<div class="alert alert-success alert-dismissible fade show py-2 border-0 rounded-0" role="alert"><strong>Successful : </strong>${text}
        </div>`;
        message.innerHTML = str;

        setTimeout(() => {
            message.innerHTML = ""
        }, 5000);

    }

    // alert to show error in adding a book if occur
    addBookError(text1) {
        let message = document.getElementById("message");
        let str = `<div class="alert alert-danger alert-dismissible fade show py-2 border-0 rounded-0" role="alert">
        <strong>Error : </strong>${text1}
        </div>`;
        message.innerHTML = str;

        setTimeout(() => {
            message.innerHTML = ""
        }, 5000);
    }

    
    showBooks(row) {
        row.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            let bookindex = localStorage.key(i);
            
            let book = JSON.parse(localStorage.getItem(bookindex))
            if(book.isIssued==false){
                let str =
            `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.bookType}</td>
            </tr>
            `;
            row.innerHTML += str
            }
            
            
        }
    }

}

export {book,updateUi}
