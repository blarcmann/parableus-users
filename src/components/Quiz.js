import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Link } from 'react-router-dom';
import { fetchQuizData, fetchQuizOptions, finishQuiz } from '../actions/quiz';
import globals from '../globals';

export class Quiz extends Component {
    quizz = {};
    score = 0;
    constructor(props) {
        super(props)
        this.state = {
            q0: JSON.parse(localStorage.getItem('q0')),
            q1: JSON.parse(localStorage.getItem('q1')),
            q2: JSON.parse(localStorage.getItem('q2')),
            q3: JSON.parse(localStorage.getItem('q3')),
            q4: JSON.parse(localStorage.getItem('q4')),
            userDetails: '',
            quizId: localStorage.getItem('quizId'),
            option0: JSON.parse(localStorage.getItem('option0')),
            option1: JSON.parse(localStorage.getItem('option1')),
            option2: JSON.parse(localStorage.getItem('option2')),
            option3: JSON.parse(localStorage.getItem('option3')),
            option4: JSON.parse(localStorage.getItem('option4')),
            activeIndex: 0,
            activeQuestion: '',
            activeOptions: '',
            showSubmit: false,
            showScore: false,
            answers: [false, false, false, false, false],
            answer0: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            score: 0,
            startQuiz: true
        }
    }

    dismissAll = () => {
        this.setState({
            showScore: false
        })
    }

    playAgain = () => {
        window.location.reload();
        this.setState({
            showScore: false
        })
    }

    activateIndex = (index) => {
        setTimeout(() => {
            if (index === 0) {
                this.setState({
                    activeIndex: 0,
                    activeQuestion: this.props.q0,
                    activeOptions: this.props.option0
                })
            }
            if (index === 1) {
                this.setState({
                    activeIndex: 1,
                    activeQuestion: this.props.q1,
                    activeOptions: this.props.option1
                })
            }
            if (index === 2) {
                this.setState({
                    activeIndex: 2,
                    activeQuestion: this.props.q1,
                    activeOptions: this.props.option2
                })
            }
            if (index === 3) {
                this.setState({
                    activeIndex: 3,
                    activeQuestion: this.props.q3,
                    activeOptions: this.props.option3
                })
            }
            if (index === 4) {
                this.setState({
                    activeIndex: 4,
                    activeQuestion: this.props.q4,
                    activeOptions: this.props.option4
                })
            }
        }, 200)
    }

    checkAll = (present) => {
        if (present[0] === false || present[1] === false || present[2] === false || present[3] === false || present[4] === false) {
            this.setState({
                showSubmit: false
            })
        } else {
            this.setState({
                showSubmit: true
            })
        }
    }

    setAnswer = (answer) => {
        console.log('activeIndex', this.state.activeIndex)
        if (this.state.activeIndex === 0) {
            let answers = this.state.answers;
            answers[0] = true;
            this.setState({
                answer0: answer,
                answers: answers
            })
            this.checkAll(this.state.answers);
            this.activateIndex(1);
        }
        if (this.state.activeIndex === 1) {
            let answers = this.state.answers;
            answers[1] = true;
            this.setState({
                answer1: answer,
                answers: answers
            })
            this.checkAll(this.state.answers);
            this.activateIndex(2);
        }
        if (this.state.activeIndex === 2) {
            let answers = this.state.answers;
            answers[2] = true;
            this.setState({
                answer2: answer,
                answers: answers
            })
            this.checkAll(this.state.answers);
            this.activateIndex(3);
        }
        if (this.state.activeIndex === 3) {
            let answers = this.state.answers;
            answers[3] = true;
            this.setState({
                answer3: answer,
                answers: answers
            })
            this.checkAll(this.state.answers);
            this.activateIndex(4);
        }
        if (this.state.activeIndex === 4) {
            let answers = this.state.answers;
            answers[4] = true;
            this.setState({
                answer4: answer,
                answers: answers
            })
            this.checkAll(this.state.answers);
        }
    }

    completeQuiz = () => {
        globals.createToast('Please wait', 3000, 'bottom-right');
        setTimeout(() => {
            if (this.props.q0.title.toString() === this.state.answer0.toString()) {
                this.score = this.score + 1;
            }
            if (this.props.q1.title.toString() === this.state.answer1.toString()) {
                this.score = this.score + 1;
            }
            if (this.props.q2.title.toString() === this.state.answer2.toString()) {
                this.score = this.score + 1;
            }
            if (this.props.q2.title.toString() === this.state.answer3.toString()) {
                this.score = this.score + 1;
            }
            if (this.props.q4.title.toString() === this.state.answer4.toString()) {
                this.score = this.score + 1;
            }
            this.finishQuiz();
            this.setState({
                showScore: true
            })
            this.setState({
                answer0: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answers: [false, false, false, false, false],
            })
        }, 2500);
    }

    finishQuiz = () => {
        console.log(this.state.quizId);
        let payload = {
            score: this.score,
            username: this.state.userDetails.name,
            _id: this.state.quizId
        }
        this.props.finishQuiz(payload)
    }

    resetState = () => {
        return this.setState({
            activeIndex: 0
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('userDetails')) {
            this.setState({
                startQuiz: false
            })
        } else {
            this.setState({
                userDetails: JSON.parse(localStorage.getItem('userDetails'))
            })
        }
        let userId = localStorage.getItem('userId');
        this.props.fetchQuizData(userId);
        this.activateIndex(0)
    }
    render() {
        return (
            <>
                <Header />
                {this.state.startQuiz ? '' :
                    <> <div className="search-null">You need to log in to start quiz.</div> </>}
                {this.props.quizData && this.props.quizOptions ?
                    <section className="height-80 mb-max">
                        <div className="container pos-vertical-center">
                            <div className="row justify-content-around">
                                <div className="col-lg-8">
                                    <div className="quiz-img">
                                        <img src={this.state.activeQuestion.image} alt={this.state.activeQuestion.image} />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className={this.state.activeIndex === 0 ? "quiz-options slide-in" : 'hide'}>
                                        <div className={this.state.answer0 === this.props.option0[0] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option0[0])}>
                                            <div className="tag">A</div>
                                            <div className="detail">{this.state.activeOptions[0]}</div>
                                        </div>
                                        <div className={this.state.answer0 === this.props.option0[1] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option0[1])}>
                                            <div className="tag">B</div>
                                            <div className="detail">{this.state.activeOptions[1]}</div>
                                        </div>
                                        <div className={this.state.answer0 === this.props.option0[2] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option0[2])}>
                                            <div className="tag">C</div>
                                            <div className="detail">{this.state.activeOptions[2]}</div>
                                        </div>
                                        <div className={this.state.answer0 === this.props.option0[3] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option0[3])}>
                                            <div className="tag">D</div>
                                            <div className="detail">{this.state.activeOptions[3]}</div>
                                        </div>
                                    </div>
                                    <div className={this.state.activeIndex === 1 ? "quiz-options slide-in" : 'hide'}>
                                        <div className={this.state.answer1 === this.props.option1[0] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option1[0])}>
                                            <div className="tag">A</div>
                                            <div className="detail">{this.state.activeOptions[0]}</div>
                                        </div>
                                        <div className={this.state.answer1 === this.props.option1[1] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option1[1])}>
                                            <div className="tag">B</div>
                                            <div className="detail">{this.state.activeOptions[1]}</div>
                                        </div>
                                        <div className={this.state.answer1 === this.props.option1[2] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option1[2])}>
                                            <div className="tag">C</div>
                                            <div className="detail">{this.state.activeOptions[2]}</div>
                                        </div>
                                        <div className={this.state.answer1 === this.props.option1[3] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option1[3])}>
                                            <div className="tag">D</div>
                                            <div className="detail">{this.state.activeOptions[3]}</div>
                                        </div>
                                    </div>
                                    <div className={this.state.activeIndex === 2 ? "quiz-options slide-in" : 'hide'}>
                                        <div className={this.state.answer2 === this.props.option2[0] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option2[0])}>
                                            <div className="tag">A</div>
                                            <div className="detail">{this.state.activeOptions[0]}</div>
                                        </div>
                                        <div className={this.state.answer2 === this.props.option2[1] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option2[1])}>
                                            <div className="tag">B</div>
                                            <div className="detail">{this.state.activeOptions[1]}</div>
                                        </div>
                                        <div className={this.state.answer2 === this.props.option2[2] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option2[2])}>
                                            <div className="tag">C</div>
                                            <div className="detail">{this.state.activeOptions[2]}</div>
                                        </div>
                                        <div className={this.state.answer2 === this.props.option2[3] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option2[3])}>
                                            <div className="tag">D</div>
                                            <div className="detail">{this.state.activeOptions[3]}</div>
                                        </div>
                                    </div>
                                    <div className={this.state.activeIndex === 3 ? "quiz-options slide-in" : 'hide'}>
                                        <div className={this.state.answer3 === this.props.option3[0] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option3[0])}>
                                            <div className="tag">A</div>
                                            <div className="detail">{this.state.activeOptions[0]}</div>
                                        </div>
                                        <div className={this.state.answer3 === this.props.option3[1] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option3[1])}>
                                            <div className="tag">B</div>
                                            <div className="detail">{this.state.activeOptions[1]}</div>
                                        </div>
                                        <div className={this.state.answer3 === this.props.option3[2] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option3[2])}>
                                            <div className="tag">C</div>
                                            <div className="detail">{this.state.activeOptions[2]}</div>
                                        </div>
                                        <div className={this.state.answer3 === this.props.option3[3] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option3[3])}>
                                            <div className="tag">D</div>
                                            <div className="detail">{this.state.activeOptions[3]}</div>
                                        </div>
                                    </div>
                                    <div className={this.state.activeIndex === 4 ? "quiz-options slide-in" : 'hide'}>
                                        <div className={this.state.answer4 === this.props.option4[0] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option4[0])}>
                                            <div className="tag">A</div>
                                            <div className="detail">{this.state.activeOptions[0]}</div>
                                        </div>
                                        <div className={this.state.answer4 === this.props.option4[1] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option4[1])}>
                                            <div className="tag">B</div>
                                            <div className="detail">{this.state.activeOptions[1]}</div>
                                        </div>
                                        <div className={this.state.answer4 === this.props.option4[2] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option4[2])}>
                                            <div className="tag">C</div>
                                            <div className="detail">{this.state.activeOptions[2]}</div>
                                        </div>
                                        <div className={this.state.answer4 === this.props.option4[3] ? "each selected" : 'each'} onClick={() => this.setAnswer(this.props.option4[3])}>
                                            <div className="tag">D</div>
                                            <div className="detail">{this.state.activeOptions[3]}</div>
                                        </div>
                                    </div>
                                    {
                                        this.props.option0 && !this.state.activeOptions[0] ?
                                            <button className="visibility-none" onClick={this.activateIndex(0)}></button> :
                                            ''
                                    }
                                    {
                                        this.props.q0 && !this.state.activeQuestion.title ?
                                            <button className="visibility-none" onClick={this.activateIndex(0)}></button> :
                                            ''
                                    }
                                    <div className="quest-cover">
                                        <h4 className="">Quiz questions</h4>
                                        <div className="question-tags">
                                            <span className={this.state.answers[0] === true ? "tag dirty" : "tag"} onClick={() => this.activateIndex(0)}>1</span>
                                            <span className={this.state.answers[1] === true ? "tag dirty" : "tag"} onClick={() => this.activateIndex(1)}>2</span>
                                            <span className={this.state.answers[2] === true ? "tag dirty" : "tag"} onClick={() => this.activateIndex(2)}>3</span>
                                            <span className={this.state.answers[3] === true ? "tag dirty" : "tag"} onClick={() => this.activateIndex(3)}>4</span>
                                            <span className={this.state.answers[4] === true ? "tag dirty" : "tag"} onClick={() => this.activateIndex(4)}>5</span>
                                        </div>
                                        <div className={this.state.showSubmit ? "submit slide-in" : 'hide'}>
                                            <button className="submit-quiz" onClick={this.completeQuiz}>Finish quiz</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <div className="search-null">Please wait...</div>
                }
                <Footer />
                <div className={this.state.showScore ? "s4me-modal" : "hide"}>
                    <div className="s4me-modal-body">
                        <div className="close-btn" onClick={this.dismissAll}>
                            <img src={require('../assets/images/close.svg')} alt="X" />
                        </div>
                        <div className="s4me-modal-body-content">
                            <div className="h3 text-center mt-2 mb-4">Final Score: {this.score}</div>
                        </div>
                        <div className="modal-action">
                            <button className="bttn secondary">
                                <Link to='/'>
                                    Home
                                </Link>
                            </button>
                            <button className="bttn primary" onClick={this.playAgain}>
                                <Link to='/quiz'>
                                    Play again
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    quizData: state.quiz.quizData,
    quizOptions: state.quiz.quizOptions,
    q0: state.quiz.q0,
    q1: state.quiz.q1,
    q2: state.quiz.q2,
    q3: state.quiz.q3,
    q4: state.quiz.q4,
    option0: state.quiz.option0,
    option1: state.quiz.option1,
    option2: state.quiz.option2,
    option3: state.quiz.option3,
    option4: state.quiz.option4,
})


export default connect(mapStateToProps, { fetchQuizData, fetchQuizOptions, finishQuiz })(Quiz)
