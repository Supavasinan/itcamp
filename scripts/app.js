const GenerateButton = document.querySelector('#generate');
const PasswordLabel = document.querySelector('#password');
const LengthSlider = document.querySelector('#length');
const LengthInput = document.querySelector('#length-value');
const CopyButton = document.querySelector('#copy-button');

const InCludeUppercase = document.querySelector('#include-uppercase');
const InCludeNumbers = document.querySelector('#include-numbers');
const InCludeSymbols = document.querySelector('#include-symbols');

let PasswordLength = 12;
const MinPasswordLength = 8
const MaxPasswordLength = 128

LengthInput.value = PasswordLength
LengthSlider.value = PasswordLength
LengthSlider.min = MinPasswordLength
LengthSlider.max = MaxPasswordLength


LengthSlider.addEventListener('input', (event) => {
    LengthInput.value = event.target.value
    PasswordLength = LengthSlider.value
    GeneratePassword()
})

LengthInput.addEventListener('input', (event) => {
    if (event.target.value < MinPasswordLength) {
        LengthInput.value = MinPasswordLength
    }
    if (event.target.value > MaxPasswordLength) {
        LengthInput.value = MaxPasswordLength
    }
    LengthSlider.value = event.target.value
    PasswordLength = LengthInput.value
    GeneratePassword()
})

CopyButton.addEventListener('click', () => {
    let previousPassword = PasswordLabel.textContent
    const previousColor = PasswordLabel.style.color
    const previousColorOutline = PasswordLabel.style.outlineColor
   
    navigator.clipboard.writeText(PasswordLabel.textContent)
    PasswordLabel.style.color = 'green'
    PasswordLabel.style.outlineColor = 'green'
    PasswordLabel.textContent = 'Copied!'
    setTimeout(() => {
        PasswordLabel.style.color = previousColor
        PasswordLabel.textContent = previousPassword
        PasswordLabel.style.outlineColor = previousColorOutline
    }, 1000)
})

let charset = 'abcdefghijklmnopqrstuvwxyz'

const Checkboxes = [InCludeNumbers, InCludeUppercase, InCludeSymbols]

Checkboxes.map((item) => {
    item.addEventListener('change', (event) => {
        switch (event.target.id) {
            case 'include-numbers':
                charset = (event.target.checked) ? charset += '0123456789' : charset.replace(/[0-9]/g, '')
                break;
            case 'include-uppercase':
                charset = (event.target.checked) ? charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : charset.replace(/[A-Z]/g, '')
               break
            case 'include-symbols':
                charset = (event.target.checked) ? charset += '!@#$%^&*()_+' : charset.replace(/[!@#$%^&*()_+]/g, '')
            default:
            break;
        }
        GeneratePassword()

    })
})

if (GenerateButton) {
GenerateButton.addEventListener('click', () => {
    GeneratePassword()
})
}
function GeneratePassword() {
    let password = '';
    for (let i = 0, n = charset.length; i < PasswordLength; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    PasswordLabel.textContent = password;
}

GeneratePassword()