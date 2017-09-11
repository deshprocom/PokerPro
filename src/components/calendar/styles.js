import {Dimensions, StyleSheet} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: 'white',
        height: 370
    },
    monthContainer: {
        width: DEVICE_WIDTH,
    },
    calendarControls: {
        backgroundColor: '#ececee',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    controlButton: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlButtonText: {
        margin: 10,
        fontSize: 15,
        color: '#CAC6CA'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        margin: 10,
        color: '#333333',
        fontWeight: 'bold',
    },
    calendarHeading: {
        flexDirection: 'row',

    },
    dayHeading: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 5,
        color: '#948F94',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    weekendHeading: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 5,
        color: '#948F94',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    weekRow: {
        flexDirection: 'row',
    },
    dayButton: {
        alignItems: 'center',
        padding: 5,
        width: DEVICE_WIDTH / 7,

    },
    dayButtonFiller: {
        padding: 5,
        width: DEVICE_WIDTH / 7,
    },
    day: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#A6A5A6',
        fontWeight: 'bold',
    },
    eventIndicatorFiller: {
        marginTop: 3,
        borderColor: 'transparent',
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    eventIndicator: {
        backgroundColor: '#C7BA6F',
        width: 5,
        height: 5,
        borderRadius: 2.5
    },
    dayCircleFiller: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    currentDayCircle: {
        backgroundColor: '#212327',
    },
    currentDayText: {
        color: '#C7BA6F',
    },
    selectedDayCircle: {
        backgroundColor: '#C7BA6F',
    },
    hasEventCircle: {},
    hasEventDaySelectedCircle: {},
    hasEventText: {},
    selectedDayText: {
        color: '#212327',
        fontWeight: 'bold',
    },
    weekendDayText: {
        color: '#A6A5A6',
    },
    currentSelected: {
        color: '#C7BA6F',
    },
    imgPrev: {
        height: 13,
        width: 15
    },
});

export default styles;
