/**
 * Created by BRITENET on 13.01.2020.
 */
({
    closeModal: function(component, event, helper){
        helper.close(component, event, helper);
    },
    onInit: function(component, event, helper){
        helper.prepareAnswers(component, event, helper);
    },
    handleAnswerChange: function(component, event, helper){
        helper.handleAnswer(component, event, helper);
    },
    handleRateChange: function(component, event, helper){
        helper.handleRate(component, event, helper);
    },
    saveOpinion: function(component, event, helper){
        helper.saveOpinionEventFire(component, event, helper);
    }

})