
({
    close: function(component){
        component.set("v.openModal", false);
    },
    prepareAnswers: function(component){
        let rateQuestionAnswers = $A.get('$Label.c.KEC_RateSizeAnswers').split(",");
        let availableAnswers = [];
        for(let i = 0; i < rateQuestionAnswers.length; i++){
            let option = { 'label' : rateQuestionAnswers[i], 'answers' : rateQuestionAnswers[i] };
            availableAnswers.push(option);
        }
        component.set("v.availableAnswers", availableAnswers);
    },
    handleAnswer: function(component, event){
        let selectedAnswer = event.getSource().get("v.value");
        component.set("v.selectedAnswer", selectedAnswer);
    },
    handleRate: function(component, event){
        let rating = event.getParam("rating");
        component.set("v.rate", rating);
    },
    saveOpinionEventFire: function(component){
        let compEvent = component.getEvent("saveOpinion");
        compEvent.setParams({
            "color" : component.get("v.selectedColor"),
            "size" : component.get("v.selectedSize"),
            "content" : component.get("v.opinionContent"),
            "answer" : component.get("v.selectedAnswer"),
            "rate" : component.get("v.rate")
        })
        compEvent.fire();
        this.close(component);
    }
})