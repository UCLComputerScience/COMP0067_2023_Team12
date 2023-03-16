function sortAndFilterData(data, selected) {
    let sortedData = data;
    if (selected == 2) {
      sortedData = sortedData.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
    }
    if (selected == 3) {
        sortedData = sortedData.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      }
    // if (filterBy) {
    //   sortedData = sortedData.filter((item) => item.property === filterBy);
    // }
    return sortedData;
  }

export default sortAndFilterData