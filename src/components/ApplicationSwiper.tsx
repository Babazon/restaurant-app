import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import theme from '../../theme';
import { Application } from '../state/Application.model';
import MyContext from '../state/Context';

export const ApplicationSwiper = () => {
	let swiperRef: CardStack|null= null;
	const {selectedRestaurant, selectApplication, toggleApplicationAsViewed} = useContext(MyContext);
	const navigation = useNavigation();
	return (
	<View style={styles.wrapper}>
		{selectedRestaurant?.applications != null &&
		<>
			<CardStack
				style={styles.content}
				loop
				renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more applications</Text>}
				ref={swiper => { swiperRef = swiper}}
				onSwipedRight={(_: number) => {/* Save Applicant */}}
				onSwipedLeft={(cardIndex: number) => toggleApplicationAsViewed && toggleApplicationAsViewed(selectedRestaurant.applications[cardIndex])}
			>
				{selectedRestaurant.applications.map((application: Application, _: number)=> (
					<Card style={styles.card} key={application.id}>
					<TouchableOpacity
						onPress={()=>{
							selectApplication && selectApplication(application);
							toggleApplicationAsViewed && toggleApplicationAsViewed(application);
							navigation.navigate('ApplicationDetail');
						}}>
								<Text style={{fontSize: 300, textAlign: 'center'}}>{['👩🏻‍🍳','🧑🏾‍🍳','👨🏻‍🍳','👩🏿‍🍳','🧑‍🍳','👨🏿‍🍳','🧑🏼‍🎤','🧕🏻', '👩🏻‍🦳', '👩🏻‍🦰'][Math.floor(Math.random()*10)]}</Text>
								<Text numberOfLines={1} lineBreakMode="tail" style={styles.label}>{application.firstname} {application.lastname}</Text>
							</TouchableOpacity>
					</Card>
				))}
			</CardStack>
			<SwipeFooter
				left={()=>swiperRef && swiperRef.swipeLeft()}
				right={()=>swiperRef && swiperRef.swipeRight()}
				back={()=>swiperRef && swiperRef.goBackFromLeft()}
			/>
		</>
		}
	</View>
	)
}

const SwipeFooter = ({left, right, back}: {left():void, right():void, back():void}) => {
	return (
		<View style={styles.footer}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.button, styles.red]} onPress={left}>
						<Text style={{fontSize: 50, textAlignVertical: 'center', textAlign: 'center'}}>👎</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.orange]} onPress={back}>
					<Text style={{fontSize: 30, textAlignVertical: 'center', textAlign: 'center'}}>👈</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.green]} onPress={right}>
					<Text style={{fontSize: 50, textAlignVertical: 'center', textAlign: 'center'}}>👍</Text>
					</TouchableOpacity>
				</View>
	</View>
	)
}


const styles = StyleSheet.create({
  wrapper: {
		flex: 1,
		backgroundColor: theme.palette.cucumber,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	},
	container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: 320,
    height: 470,
  	backgroundColor: theme.palette.pineapple,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
		shadowOpacity:0.5,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical:8
  },
  label: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  }
});
