import moment from 'moment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../styles/companies.css'

function CompaniesAdd() {
  const { id } = useParams()
  const loc = useLocation()
  const router = useNavigate()
  console.log({ loc })

  const [input, setInput] = useState({
    company_name: '',
    status: 'trial',
    address: '',
    date_of_creation: '',
  })
  const [validated, setValidated] = useState(false)

  const getCompany = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/company/${id}`)
    const data = await res.json()
    console.log({ data })
    if (data && data.data && data.data.company && data.data.company.id) {
      const { name, status, address, started_at } = data.data.company
      console.log({ started_at: moment(started_at).format() })
      setInput((prev) => ({
        ...prev,
        company_name: name,
        status,
        address,
        date_of_creation: moment(started_at).format('YYYY-MM-DD\THH:MM:SS'),
      }))
    }
  }

  const addCompany = async (e) => {
    e.preventDefault()
    // console.log({ d: moment(input.date_of_creation).isAfter(new Date()) })
    // return
    if (
      !input.address ||
      !input.company_name ||
      !input.date_of_creation ||
      !input.status
    ) {
      setValidated(true)
    } else {
      if (moment(input.date_of_creation).isAfter(new Date())) {
        setValidated(true)
      } else {
        const formData = new FormData()
        formData.append('name', input.company_name)
        formData.append('address', input.address)
        formData.append('status', input.status)
        formData.append(
          'started_at',
          moment(input.date_of_creation).format('YYYY-MM-DD HH:MM:SS'),
        )
        setValidated(false)
        const res = await fetch(`http://127.0.0.1:8000/api/company/create`, {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data && data.data.company.id) {
          router(loc.state.lastURL)
          console.log({ data })
        }
      }
    }
  }

  const updateCompany = async (e) => {
    e.preventDefault()
    if (
      !input.address ||
      !input.company_name ||
      !input.date_of_creation ||
      !input.status ||
      moment(input.date_of_creation).isAfter(new Date())
    ) {
      setValidated(true)
    } else {
      if (moment(input.date_of_creation).isAfter(new Date())) {
        setValidated(true)
      } else {
        const formData = new FormData()
        formData.append('name', input.company_name)
        formData.append('address', input.address)
        formData.append('status', input.status)
        formData.append(
          'started_at',
          moment(input.date_of_creation).format('YYYY-MM-DD HH:MM:SS'),
        )
        setValidated(false)
        const res = await fetch(
          `http://127.0.0.1:8000/api/company/${id}/edit`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: input.company_name,
              address: input.address,
              status: input.status,
              started_at: moment(input.date_of_creation).format(
                'YYYY-MM-DD HH:MM:SS',
              ),
            }),
          },
        )
        const data = await res.json()
        if (data && data.data.company.id) {
          router(loc.state.lastURL)
          console.log({ data })
        }
      }
    }
  }

  useEffect(() => {
    if (id) getCompany(id)
  }, [id])

  const handleInput = (e) => {
    console.log({ val: e.target.value })
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <section className="conatiner mx-auto my-10">
        <div className="xl:max-w-screen-md lg:max-w-screen-md md:max-w-screen-md sm:max-w-screen-sm px-1 px-2 mx-auto border border-gray-100 shadow-xl rounded-lg">
          <form
            className="px-5 py-5"
            onSubmit={id ? updateCompany : addCompany}
          >
            <div className="mb-6">
              <label
                htmlFor="CompanyName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                value={input.company_name}
                name="company_name"
                onChange={(e) => handleInput(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none focus:ring-1"
                placeholder="Company Name"
                // required
              />
              <span className="error-text">
                {validated && !input.company_name ? 'Name is required!' : ''}
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="Status"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select an option
              </label>
              <select
                id="status"
                name="status"
                onChange={(e) => handleInput(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none focus:ring-1"
                value={input.status}
              >
                <option value="trial">Trial</option>
                <option value="customer">Customer</option>
                <option value="dead">Dead</option>
              </select>

              <span className="error-text">
                {validated && !input.status ? 'Status is required!' : ''}
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="Address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Address
              </label>
              <textarea
                id="address"
                name="address"
                value={input.address}
                onChange={(e) => handleInput(e)}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none focus:ring-1"
                placeholder="Address..."
              ></textarea>

              <span className="error-text">
                {validated && !input.address ? 'Address is required!' : ''}
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="DateOfCreation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date of Creation
              </label>
              <input
                type="datetime-local"
                id="date_of_creation"
                value={input.date_of_creation}
                name="date_of_creation"
                onChange={(e) => handleInput(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none focus:ring-1"
              />

              <span className="error-text">
                {validated && !input.date_of_creation
                  ? 'Date is required!'
                  : validated &&
                    input.date_of_creation &&
                    moment(input.date_of_creation).isAfter(new Date())
                  ? 'Please enter valid date'
                  : ''}
              </span>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {id ? 'UPDATE' : 'ADD'}
            </button>
            <button
              className="text-blue-700 hover:text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
              onClick={() => router('/companies', { replace: true })}
            >
              CANCEL
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
export default CompaniesAdd
