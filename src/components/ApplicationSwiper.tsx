import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { connect, ConnectedProps } from 'react-redux';
import theme from '../../theme';
import { Application } from '../state/Application.model';
import { RootState, selectApplication} from '../state/Redux';


const mapState = (state: RootState) => ({
  selectedRestaurant: state?.selectedRestaurant
})

const mapDispatch = {
	selectApplication,
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const ApplicationSwiper = (props: PropsFromRedux) => {
	let swiperRef: CardStack|null= null; // Not sure about this one! useRef could be better but this library is not typed well.
	const navigation = useNavigation(); // useful for accessing navigation object without drilling drops
	return (
	<View style={styles.wrapper}>
		{!!props.selectedRestaurant?.applications?.length &&
		<>
			<CardStack
				style={styles.content}
				renderNoMoreCards={() => <Card style={StyleSheet.flatten([styles.card, {backgroundColor: 'transparent'}])}><Text style={styles.noMoreCards}>No more applications... Check later for more.</Text></Card>}
				ref={swiper => { swiperRef = swiper}}
				onSwipedRight={(_: number) => {/* Save Applicant */}}
			>
				{props.selectedRestaurant?.applications.map((application: Application, _: number)=> (
					<Card style={styles.card} key={application.id}>
					<TouchableOpacity
						onPress={()=>{
							props.selectApplication(application);
							navigation.navigate('ApplicationDetail');
						}}>
								<Text style={styles.avatarEmoji}>{getAvatarEmoji()}</Text>
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
			<View style={{flex: 1}}/>
		</>
		}
		{!props.selectedRestaurant?.applications?.length &&
			<View>
				<Text>You have no applications yet</Text>
			</View>
			}
	</View>
	)
}



const SwipeFooter = ({left, right, back}: {left():void, right():void, back():void}) => {
	return (
		<View style={styles.footer}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={[styles.button, styles.red]} onPress={left}>
						<Text style={styles.swipeIcon}>👎</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.orange]} onPress={back}>
					<Text style={styles.revertIcon}>👈</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.green]} onPress={right}>
					<Text style={styles.swipeIcon}>👍</Text>
					</TouchableOpacity>
				</View>
	</View>
	)
}

const getAvatarEmoji = () => ['👩🏻‍🍳','🧑🏾‍🍳','👨🏻‍🍳','👩🏿‍🍳','🧑‍🍳','👨🏿‍🍳','🧑🏼‍🎤','🧕🏻', '👩🏻‍🦳', '👩🏻‍🦰'][Math.floor(Math.random()*10)];

export default connector(ApplicationSwiper)


const styles = StyleSheet.create({
  avatarEmoji: {
    fontSize: 300,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.5,
    zIndex: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220
  },
  card: {
    alignItems: 'center',
    backgroundColor: theme.palette.pineapple,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.5,
		margin: 48
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    flexDirection: 'column'
  },
  content: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center'
  },
  footer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  green: {
    backgroundColor: '#fff',
    borderColor: '#01df8a',
    borderRadius: 75,
    borderWidth: 6,
    height: 75,
    width: 75
  },
  label: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontFamily: 'System',
    fontSize: 32,
    textAlign: 'center'
  },
  noMoreCards: {
		textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  },
  orange: {
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    borderWidth: 6,
    height: 55,
    marginTop: -15,
    width: 55
  },
  red: {
    backgroundColor: '#fff',
    borderColor: '#fd267d',
    borderRadius: 75,
    borderWidth: 6,
    height: 75,
    width: 75
  },
  revertIcon: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  swipeIcon: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  wrapper: {
		alignItems: 'stretch',
    backgroundColor: theme.palette.cucumber,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
