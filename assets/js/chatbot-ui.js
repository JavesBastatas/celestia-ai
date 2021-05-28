define(function(require, module, exports){
    
    var UI = {
       messagesCount: 0,
       messageTopMargin: "10",
       ctrlElement: null,
       inputElement: null,
       sendButton: null,
    };
    
    UI.craftMessageTag = function(addon){
        var div1= document.createElement("div")
        var div2= document.createElement("div");
        div1.classList.add("message", "col-sm-12",addon);
        div2.classList.add("animate__animated","animate__zoomIn","content", "col-sm-12", "shadowed",addon);
        
        div1.appendChild(div2);
        
        return div1;
    };
    
    UI.addMessage = function(message, type){
        
        
        if(!message) return;
        
        this.messagesCount++;
        
       var marginTop = this.messagesCount * this.messageTopMargin;
       
        var element = this.craftMessageTag(type);
        element.children[0].innerText = message
        element.style.marginTop += marginTop;
        
        if(type === "bot"){
            setTimeout(function() {
                this.ctrlElement.appendChild(element);
            }.bind(this), 1000);
        } else {
            setTimeout(function() {
                this.ctrlElement.appendChild(element);
            }.bind(this), 500);
        }
    };
    
    UI.checkCtrl = function(){
        if(!this.ctrlElement) throw new Error("Celestia UI is still not settled up")
    };
    
    UI.setup = function(celestia, selectors){
        this.ctrlElement = document.querySelector(selectors.parent);
        this.sendButton = document.querySelector(selectors.button);
        this.inputElement = document.querySelector(selectors.input);
        
        this.inputElement.focus();
        
        this.sendButton.addEventListener("click", ev=>{
            
            var value = this.inputElement.value;
            this.inputElement.value = ""
            
            
            celestia.chat(value)
            
        });
        
        
    };
    
    return UI;
});
