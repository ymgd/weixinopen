const API_BASE = 'http://weeklyapi.75team.com'

export const getLatest = () => {
	return `${API_BASE}/issue/latest`
}

export const getListByPage = (page) => {
	return `${API_BASE}/issue/list/${page}`
}

export const getIssueDetail = (iid)  => {
	return `${API_BASE}/issue/detail/${iid}`
}

export const getTrans = (url) => {
	return `${API_BASE}/transcode/${url}`
}

export const getSearchRes = (keyword, page) => {
	
	return `${API_BASE}/article/search/${keyword}/${page}/hl/0`
}