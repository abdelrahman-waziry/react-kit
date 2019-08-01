export default function validateInput(state, input){
    if(!state[input.name]){
        input.hasError = true
        input.errorMessage = 'This field is required'
    }
    else {
        clearErrors(input)
        validateInputTypes(state, input)
    }
}

function validateInputTypes(state, input){
    if(input.name == 'mobile'){
        if(!/^(\d{1,3}[- ]?)?\d{10}$/.test(state[input])){
            input.hasError = true
            input.errorMessage = 'Please enter a valid number'
        }
        else {
            clearErrors(input)
        }
    }
}

function clearErrors(input){
    input.hasError = false
    input.errorMessage = ''
}
