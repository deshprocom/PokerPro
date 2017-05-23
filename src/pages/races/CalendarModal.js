/**
 * Created by lorne on 2017/3/22.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput, ListView,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {
    YYYY年MM月, DayHeadings, MonthNames,
    getCurrentDate, convertDate,
    YYYY_MM, getMonthLastDay,
} from '../../utils/ComonHelper'
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Calendar from '../../components/calendar/Calendar';
import {SEARCH_RANGE_LIST} from '../../actions/ActionTypes';
import {fetchRangeList} from '../../actions/RacesAction';

const Y_M_D = 'YYYY-MM-DD';


class CalendarModal extends Component {

    static props = {
        btnOpen: PropTypes.func,
        selected: PropTypes.func
    }

    componentDidMount() {
        this.props.selected(getCurrentDate().format(Y_M_D));
        this._rangeList(getCurrentDate().format(YYYY_MM));
    }

    state = {
        eventDates: []
    };

    render() {
        return (
            <View
                testID="page_calendar"
                style={styles.container}>
                <Calendar
                    ref={ref=>this.calendar = ref}
                    eventDates={this.state.eventDates}
                    scrollEnabled
                    showControls
                    showEventIndicators
                    dayHeadings={DayHeadings}
                    monthNames={MonthNames}
                    titleFormat={YYYY年MM月}
                    onDateSelect={(date) =>{
                        this.props.selected(convertDate(date,Y_M_D));

                    }}
                    onSwipeNext={this.onMonChanged}    // Callback for forward swipe event
                    onSwipePrev={this.onMonChanged}    // Callback for back swipe event
                    onTouchNext={this.onMonChanged}    // Callback for next touch event
                    onTouchPrev={this.onMonChanged}    // Callback for prev touch event
                />
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>this.props.btnOpen()}
                    style={styles.btnBottom}/>
            </View>
        )
    }

    componentWillReceiveProps(newProps) {
        const {hasData, rangeList, loading, actionType} = newProps;
        if (this.props.loading !== loading
            && hasData && actionType === SEARCH_RANGE_LIST) {
            const {items} = rangeList;
            this._monthRaces(items);

        }

    }

    _monthRaces = (arr) => {
        let raceArray = [];
        arr.forEach(function (x) {
            if (x.counts > 0)
                raceArray.push(x.date)
        });

        this.setState({
            eventDates: raceArray
        })

    };


    onMonChanged = (date) => {

        this._rangeList(convertDate(date._d, YYYY_MM))
    };

    _rangeList = (month) => {
        let lastDate = getMonthLastDay(month + '-01')
        const body = {
            begin_date: month + '-01',
            end_date: lastDate
        };
        this.props.fetchRangeList(body);

    }


}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Metrics.navBarHeight,
        flex: 1
    },
    btnBottom: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 300
    }

});

const bindAction = dispatch => ({
    fetchRangeList: (body) => dispatch(fetchRangeList(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    rangeList: state.RaceState.rangeList
});

export default connect(mapStateToProps, bindAction)(CalendarModal);