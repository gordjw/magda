import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPreviewData} from '../actions/previewDataActions'
import { bindActionCreators } from 'redux';
import DataPreviewTable from '../UI/DataPreviewTable';


const defaultSpec = {
  "description": "Example data",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
}

class DistributionPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {spec: {
        "description": "",
        "mark": "bar",
        "encoding": {
          "x": {"field": "", "type": "ordinal"},
          "y": {"field": "", "type": "quantitative"}
        }
      }
    }
    this.logChange = this.logChange.bind(this);
  }


  logChange(data){
    // need to validate data
    this.setState({
      spec: data
    })
  }

  componentWillMount(){
    this.props.fetchPreviewData([this.props.distribution]);
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.distribution.downloadURL !== nextProps.distribution.downloadURL){
        this.props.fetchPreviewData([nextProps.distribution]);
      }
  }

  visualisable(){
    return !this.props.isFetching && !this.props.error && this.props.data;
  }

  render(){
    return (<div className='dataset-preview container'>
                  {this.visualisable() && <DataPreviewTable data={this.props.data} fileName= {this.props.fileName}/>}
                  {this.props.error && <div> Error</div>}
            </div>)
  }
}

function mapStateToProps(state) {
  const distribution =state.record.distribution;
  const previewData= state.previewData;
  const data = previewData.previewData;
  const isFetching = previewData.isFetching;
  const error = previewData.error;
  const fileName = previewData.fileName;
  return {
    data, isFetching, error, distribution, fileName
  };
}

const  mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators({
    fetchPreviewData: fetchPreviewData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributionPreview);
