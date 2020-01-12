import { FETCH_QUIZ_DATA, FETCH_QUIZ_OPTIONS } from '../constants';
import axios from 'axios';
import globals from '../globals';


export function fetchQuizData(userId) {
    const userToken = localStorage.getItem('userToken');
    return dispatch => {
        axios.get(`${globals.base_url}/quiz/start/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        })
            .then(response => {
                if (response.success === false) {
                    const msg = response.data.msg || 'Please reload page.';
                    globals.createToast(msg, 3000, 'bottom-right');
                    return console.log(response, 'fetch quiz not successful');
                }
                let res = response.data;
                dispatch(quizData(res.data));
                let quizz = Object.values(res.data);
                localStorage.setItem('q0', JSON.stringify(quizz[0]));
                localStorage.setItem('q1', JSON.stringify(quizz[1]));
                localStorage.setItem('q2', JSON.stringify(quizz[2]));
                localStorage.setItem('q3', JSON.stringify(quizz[3]));
                localStorage.setItem('q4', JSON.stringify(quizz[4]));
                quizz.forEach((quiz, index) => {
                    let payload = {
                        title: quiz.title
                    }
                    this.fetchQuizOptions(index, payload);
                })
            })
            .catch(error => {
                console.log('catch error register', error);
                throw (error);
            })
    }
}

export function fetchQuizOptions(index, payload) {
    const userToken = localStorage.getItem('userToken');
    return dispatch => {
        axios.post(`${globals.base_url}/quiz/options`, payload, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        })
            .then(response => {
                if (response.success === false) {
                    const msg = response.data.msg || 'Please reload page.';
                    globals.createToast(msg, 3000, 'bottom-right');
                    return console.log(response, 'fetch quiz not successful');
                }
                let res = response.data;
                if(index === 0) {localStorage.setItem('option0', JSON.stringify(res.data))};
                if(index === 1) {localStorage.setItem('option1', JSON.stringify(res.data))};
                if(index === 2) {localStorage.setItem('option2', JSON.stringify(res.data))};
                if(index === 3) {localStorage.setItem('option3', JSON.stringify(res.data))};
                if(index === 4) {localStorage.setItem('option4', JSON.stringify(res.data))};
                dispatch(quizOptions(res.data));
            })
            .catch(error => {
                console.log('catch error register', error);
                throw (error);
            })
    }
}

function quizData(payload) {
    return {
        type: FETCH_QUIZ_DATA,
        payload
    }
}

function quizOptions(payload) {
    return {
        type: FETCH_QUIZ_OPTIONS,
        payload
    }
}

