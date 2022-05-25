function readPin () {
    reading += pins.analogReadPin(AnalogPin.P0)
    pins.digitalWritePin(DigitalPin.P0, 1)
}
function sense () {
    reading = 0
    for (let index3 = 0; index3 <= samples; index3++) {
        readPin()
        basic.pause(1)
    }
    state = calibration_value + threshold < reading / samples
}
function calibrate () {
    reading = 0
    for (let index2 = 0; index2 <= samples; index2++) {
        readPin()
        basic.pause(1)
    }
    calibration_value = reading / samples
}
input.onButtonPressed(Button.A, function () {
    calibration_value = 0
    calibrate()
    basic.showNumber(calibration_value)
})
input.onButtonPressed(Button.B, function () {
    sensing = true
    while (sensing) {
        sense()
        if (state) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                `)
        }
        basic.pause(10)
    }
})
let sensing = false
let calibration_value = 0
let reading = 0
let state = false
let samples = 0
let threshold = 0
let index = 0
threshold = 2
pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
samples = 8
state = false
