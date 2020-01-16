/**
 * Created by BRITENET on 13.01.2020.
 */
({
    closeModal: function(component, event, helper){
        helper.close(component);
    },
    onInit: function(component, event, helper){
        helper.prepareAnswers(component);
    },
    handleAnswerChange: function(component, event, helper){
        helper.handleAnswer(component, event);
    },
    handleRateChange: function(component, event, helper){
        helper.handleRate(component, event);
    },
    saveOpinion: function(component, event, helper){
        helper.saveOpinionEventFire(component);
    }

})