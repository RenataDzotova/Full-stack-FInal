import { redirect } from "next/dist/server/api-utils"
import { useState } from "react"
import { useRouter } from "next/router"
import { Textarea } from '@nextui-org/react';
import { Input } from '@nextui-org/react';

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
        <div style={{ display:'flex', flexDirection:'column', height:'350px', justifyContent:'space-around'}}>
          <select style={{ display:'flex', height:'40px', borderRadius:'15px', border:'1px solid #e2e8f0', padding:'0 10px 0 10px', color:'grey', fontSize:'14px', border:'2px solid rgb(200 200 200)'}}
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



          <Input 
          bordered 
          labelPlaceholder="Movie Title" 
          onChange={e => handleTitleChange(e.target.value)} 
          color="default" />

          <Textarea
          bordered
          color="gray"
          labelPlaceholder="Review"
          onChange={e => handleChange(e.target.value)} language={category}
        />

          <Button
            type="submit"
            style={{borderRadius:'15px', border:'1px solid #e2e8f0', padding:'10px', color:'#ffffff', fontSize:'18px', border:'2px solid rgb(200 200 200)', fontWeight:'bold', backgroundColor:'#0072f5'}}
          >
            Post a Review
          </Button>
        </div>
      </div>
    </form>
  )
}