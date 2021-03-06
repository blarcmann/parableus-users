import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './layouts/Header';
import globals from '../globals';
import Footer from './layouts/Footer';
import { fetchParable } from '../actions/parables';
import { parableSearch } from '../actions/parables';
import { fetchRandomAdvert, clickAdvert } from '../actions/adverts';

export class ParableDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVideo: false
        }
    }
    imgUrl = '';
    showAudio = false;
    componentDidMount() {
        const parableId = this.props.match.params.id;
        this.props.fetchParable(parableId);
        this.props.parableSearch();
        this.props.fetchRandomAdvert()
    }

    dismissAll = () => {
        this.setState({
            showVideo: false
        })
    }

    watchVideo = () => {
        this.setState({
            showVideo: true
        })
    }

    listenToAudio = () => {
        if (this.showAudio) {
            this.showAudio = true
        } else {
            globals.createToast('Sorry, audio explanation is not available for this parable', 3000, 'top');
        }
    }

    render() {
        if (this.props.parable && this.props.parable.file && this.props.parable.file.Location) {
            this.imgUrl = this.props.parable.file.Location
        }
        if (this.props.parable && this.props.parable.sound && this.props.parable.sound.Location) {
            this.showAudio = true;
        }
        if (this.props.parable && this.props.parable.youtube) {
            this.showVideo = true;
        }
        if (this.props.advert && this.props.advert.image && this.props.advert.image.Location) {
            this.adImgUrl = this.props.advert.image.Location
        }
        return (
            <>
                <Header />
                {this.props.parable ?
                    <>
                        <section className="switchable switchable--switch feature-large pb-5">
                            <div className="container">
                                <div className="row justify-content-around">
                                    <div className="col-md-6 col-12">
                                        <div className="banner-img">
                                            <div className={this.imgUrl ? "img-cover" : 'hide'}>
                                                <img alt="alter" src={this.imgUrl} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5">
                                        <div className="switchable__text">
                                            <p className={this.props.parable ? 'parable' : 'hide'}>{this.props.parable.title}</p>
                                            <p className={this.props.parable ? 'translation mt-3' : 'hide'} dangerouslySetInnerHTML={{ __html: this.props.parable.translation }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="border--bottom space--xxs pb-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <div className="audio-option">
                                            <div className="modal-instance">
                                                {/* <button className={this.props.parable.sound ? "btn type--uppercase modal-trigger mb-0" : 'hide'} onClick={this.listenToAudio}>
                                                    &#9654; Listen now</button> */}
                                                <button className={this.props.parable.youtube ? "ml-3 btn type--uppercase modal-trigger" : 'hide'} onClick={this.watchVideo}>
                                                    &#9654; Watch video
                                                </button>
                                            </div>
                                        </div>
                                        {this.props.parable.sound && this.props.parable.sound.Location ?
                                            <div className={this.showAudio ? 'slide-in' : 'hide'}>
                                                <audio controls>
                                                    <source src={this.props.parable.sound.Location} type="audio/ogg" />
                                                    <source src={this.props.parable.sound.Location} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                            </audio>
                                            </div>
                                            : ''}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </> :
                    <div className="search-null">Please wait...</div>
                }
                <section>
                    <div className="col-lg-12 col-sm-12 pt-5" onClick={this.clickAdvert}>
                        {this.props.advert ?
                            <a href={this.props.advert.link} target="_blank" rel="noopener noreferrer">
                                <div className="ads-img ads">
                                    <figure className={this.adImgUrl ? "img-cover" : 'hide'}>
                                        <img alt="alter" src={this.adImgUrl} />
                                        <figcaption>{this.props.advert.title}</figcaption>
                                    </figure>
                                </div>
                            </a> :
                            <div></div>
                        }

                    </div>
                </section>
                <Footer />
                <div className={this.state.showVideo ? "s4me-modal" : "hide"}>
                    <div className="s4me-modal-body large p-0">
                        <div className="close-btn" onClick={this.dismissAll}>
                            <img src={require('../assets/images/close.svg')} alt="X" />
                        </div>
                        <div className="s4me-modal-body-content p-0">
                            <iframe src={this.state.showVideo ? this.props.parable.youtube : ''}
                                width="400" title={this.props.parable.title} height="315" frameBorder="0" allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    parable: state.parables.parable,
    advert: state.adverts.advert
})


export default connect(mapStateToProps, { fetchParable, parableSearch, fetchRandomAdvert, clickAdvert })(ParableDetails)
