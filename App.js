import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';


const colors = ["#E36B2C","#23BAC4","#8C4966"]

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  const optionsTimes = {
    0: 25,
    1: 5,
    2: 15,
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000);
    }
    else {
      clearInterval(interval);
    }

    if (time === 0) {
	  setIsActive(false);
	  setTime(optionsTimes[currentTime] * 60);
  }
 
    return () => clearInterval(interval);
  }, [isActive, time])

  const handleStartStop = () => {
    setIsActive(!isActive);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{
          flex: 1, 
          paddingHorizontal: 15, 
          paddingTop: Platform.OS === "android" && 30,
        }}>
        <Text style={styles.text}> Pomodoro </Text>
        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime}/>
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color: "white", fontWeight: 'bold'}}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign:'center'
  },
  button: {
    backgroundColor: "#474b4e",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  }
});
