import { useState } from "react"

import SimpleCodeEditor from "../../components/SimpleCodeEditor"
import Button from "../Button"
import LanguageDropdown from "../LanguageDropdown"

export default function NewPostForm({ defaultTitle="no title", defaultCategory="no category", defaultCode = "", onSubmit, onChange, className = "" }) {
  const [code, setCode] = useState(defaultCode)
  // const [language, setLanguage] = useState(defaultLanguage)
  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState(defaultTitle);

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ code, category, title })
  }

  const genreOptions = [
    { value: '', label: 'Select Genre' },
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
  ];
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
      // language={category}
    };

    const handleTitleChange = (value) => {
      setTitle(value)
      onChange?.(value)
    };

  const handleChange = (value) => {
    setCode(value)
    onChange?.(value)
  }

  return (
    <form onSubmit={handleSubmit} className={"mt-8 space-y-6 " + className} action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>

          
          <label htmlFor="movie-genres-dropdown">Select a genre:</label>
          <select
            id="movie-genres-dropdown"
            value={category}
            onChange={handleCategoryChange}
          >
            {genreOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <input name="title" onChange={e => handleTitleChange(e.target.value)} language={title}/>

          <input name="code" onChange={e => handleChange(e.target.value)} language={category}/>

          <Button
            type="submit"
          >
            Push!
          </Button>
        </div>
      </div>
    </form>
  )
}