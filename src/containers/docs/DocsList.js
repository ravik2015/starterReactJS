import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "react-js-pagination";
import { getRecord } from "../../actions/records";
import "../_styles/docs.css";
/*********** PAGINATIONS CONFIG ************/
const ITEM_PER_PAGE = 10,
  PAGE_RANGE_SHOW = 10;

class DocsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.indexOfLastList = 1 * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
  }

  componentWillMount() {
    const { getRecord, user } = this.props;
    getRecord({ _id: user._id }, res => {});
  }

  /************ Active page on change of pagination ***********/
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.indexOfLastList = pageNumber * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
  }

  /************ List of docs **********/
  list() {
    const { records, user } = this.props;
    return records
      .slice(this.indexOfFirstList, this.indexOfLastList)
      .map((row, index) => (
        <tr key={index}>
          <td className="check">#</td>
          <td dangerouslySetInnerHTML={{ __html: row.title.replace(/\n/g, '<br />')}}></td>
          <td>{moment(row.updated_at).format("LLL")}</td>
          <td>
            <img src="./images/doc.png" /> {row.media_length} sec.
          </td>
          <td>{user.name}</td>
          <td>
            <Link to={`/docs/${row._id}`}>View Detail</Link>
          </td>
        </tr>
      ));
  }
  render() {
    const { records } = this.props;
    return (
      <div className="main-content">
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th />
                  <th>Title</th>
                  <th>Last Updated</th>
                  <th>Media Length</th>
                  <th>Created by</th>
                  <th />
                </tr>
              </thead>
              <tbody>{this.list()}</tbody>
            </table>
          </div>
          <Pagination
            innerClass="pagination"
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={ITEM_PER_PAGE}
            prevPageText={
              <i className="fa fa-chevron-left customIcon" aria-hidden="true" />
            }
            nextPageText={
              <i
                className="fa fa-chevron-right customIcon"
                aria-hidden="true"
              />
            }
            totalItemsCount={
              records.length / ITEM_PER_PAGE > 1 ? records.length : 0
            }
            pageRangeDisplayed={PAGE_RANGE_SHOW}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

DocsList.propTypes = {
  records: PropTypes.array.isRequired,
  getRecord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  records: state.records
});

const mapDispatchToProps = dispatch => ({
  getRecord: bindActionCreators(getRecord, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocsList);
