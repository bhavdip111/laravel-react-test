import Pagination from 'react-js-pagination'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import AddIcon from '../icons/add_icon.svg'
import Spinner from '../icons/spinner.gif'
import '../styles/companies.css'

function Companies() {
  const [params] = useSearchParams()
  console.log(params.get('page'))
  const [companies, setCompanies] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const loc = useLocation()
  const router = useNavigate()

  const getCompanies = async (status, page) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/company?status=${status}&page=${page}`,
      )
      const data = await res.json()
      console.log({ data })
      if (data && data.data && data.data.company && data.data.company.length) {
        setCompanies(data.data.company)
        setPageCount(data.pagination.last_page_number)
        setTotal(data.pagination.total)
      } else {
        setCompanies([])
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log({ error })
    }
  }

  useEffect(() => {
    if (parseInt(params.get('page'))) setPage(parseInt(params.get('page')))
    if (params.get('status')) setStatus(params.get('status'))
  }, [params])

  useEffect(() => {
    setLoading(true)
    getCompanies(params.get('status'), page)
  }, [page])

  useEffect(() => {
    setLoading(true)
    setPage(1)
    getCompanies(status, 1)
  }, [status])

  return (
    <>
      <section className="container mx-auto mt-10 mb-5">
        <div className="filter">
          <select
            id="status"
            name="status"
            onChange={(e) => {
              setStatus(e.target.value)
              router(`/companies?status=${e.target.value}&page=${page}`)
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none focus:ring-1"
            value={status}
          >
            <option value="">Filter By Status</option>
            <option value="trial">Trial</option>
            <option value="customer">Customer</option>
            <option value="dead">Dead</option>
          </select>
        </div>
        <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm px-1 px-2 mx-auto">
          <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {companies && companies.length ? (
                companies.map((item) => (
                  <tbody className="table_body">
                    <tr key={item.id} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/companies/edit/${item.id}`}
                          state={{ lastURL: loc.pathname + loc.search }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <div>
                  {loading ? (
                    <img src={Spinner} />
                  ) : (
                    <div className="no-result">NO RECORD FOUND</div>
                  )}
                </div>
              )}
            </table>
          </div>
        </div>
      </section>
      {companies && companies.length ? (
        <Pagination
          // className="pagination"
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          onChange={(page) => {
            console.log({ page })
            setPage(page)
            router(`/companies?status=${status}&page=${page}`)
          }}
          activeClass="active-page"
        />
      ) : null}
      <div className="fixed right-10 bottom-10">
        <Link
          to="/companies/add"
          state={{ lastURL: loc.pathname + loc.search }}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full shadow-full">
            <img
              src={AddIcon}
              alt="add Companies"
              className="absolute h-[25px] top-[4px] left-[5px]"
            />
          </div>
        </Link>
      </div>
    </>
  )
}
export default Companies
