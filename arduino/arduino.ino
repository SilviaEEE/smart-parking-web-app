/*
 * Silvia code for PIR sensor and Arduino 
 */
 
int pirPin = 2; // choose the input pin (for PIR sensor)
int pirState = LOW; // we start, assuming no motion detected
int val = 0; // variable for reading the pin status
String inputString = ""; // holds messages coming from the nodejs server
boolean stringComplete = false; // status of when string is complete

//setup arduino board 
void setup()
{
  Serial.begin(9600); // set the Baud Rate
  pinMode(pirPin, INPUT); // set sensor as input pin
}

//read state of PIR sensor and print output
void loop(){
  val = digitalRead(pirPin); // read input value
  if (val == HIGH) {         // check if the input is HIGH
    if (pirState == LOW) {
      // we have just turned on
      Serial.println("{'id':'spot1', 'lat':51.523518, 'lng':-0.130158, 'type':'free'}");
      // only print on the output change, not state
      pirState = HIGH;
    }
  } else {
    if (pirState == HIGH){
      // we have just turned of
      Serial.println("{'id':'spot1', 'lat':51.523518, 'lng':-0.130158, 'type':'occupied'}");
      // only print on the output change, not state
      pirState = LOW;
    }
  }
}

// //deals with receiving messages from node js server
//  void serialEvent() {
//   while (Serial.available()) {
//     // get the new byte:
//     char inChar = (char)Serial.read();
//     // add it to the inputString:
//     inputString += inChar;
//     // if the incoming character is a "\n" we detect the end of the string
//     if (inChar == '\r') {
//       stringComplete = true;
//     }
//   }
// }