import { useState, useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'
import { useForm } from 'react-hook-form'
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from "axios"

import FormInput from "./FormInput";

export default function AdminProduct({productId, viewProduct}) {

  const [ product, setProduct ] = useState()
  const [ productObject, setProductObject ] = useState()
  const [ isPennding, setIsPennding ] = useState(true)
  const [ err, setErr ] = useState()
  const [ value, setValue ] = useState('')

  // const [editorState, setEditorState] = useState(
  //   () => EditorState.createEmpty(),
  // );)

  const shema = z.object({
    name: string().min(1, { message: "Pole jest wymagane" }),
    category: string().min(1, { message: "Pole jest wymagane" }),
    ref_number: string().min(1, { message: "Pole jest wymagane" }),
    main_img: string().min(1, { message: "Pole jest wymagane" }),
    netto: string().min(1, { message: "Pole jest wymagane" }),
    vat: string().min(1, { message: "Pole jest wymagane" }),
    stock: string().min(1, { message: "Pole jest wymagane" })
  })

  const { register, handleSubmit, formState, reset } = useForm({ resolver: zodResolver(shema)});

  const { errors } = formState

  const productName = {name: 'name', label: 'Nazwa produktu', type: 'text'}
  const productCategory = {name: 'category', label: 'Kategoria produktu', type: 'text'}
  const productRef = {name: 'ref_number', label: 'Numer referencyjny', type: 'text'}
  const productImg = {name: 'main_img', label: 'Obrazek produktu', type: 'text'}
  const productNetto = {name: 'netto', label: 'Cena NETTO produktu', type: 'text'}
  const productVat = {name: 'vat', label: 'Stawka VAT', type: 'text'}
  const productQty = {name: 'stock', label: 'Stan magazynowy', type: 'text'}

  useEffect(() => {
    if (productId) {
      Axios.get(`http://localhost:3001/api/admin/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        const productObject = {
          name: res.data[0].name,
          category: res.data[0].category,
          ref_number: res.data[0].ref_number.toString(),
          description: res.data[0].description,
          main_img: (res.data[0].main_img).slice(10),
          netto: res.data[0].netto.toString(),
          vat: ((res.data[0].vat - 1) * 100).toString(),
          stock: res.data[0].stock.toString(),
        }
        setProductObject(productObject)
        setValue(productObject.description)
        setIsPennding(false);
        setErr(null);
      })
      .catch(err => {
        console.log(err)
        setIsPennding(false);
        setErr(err.message);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (productId) {
      reset({...productObject})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const submitProduct = (data) => {
    console.log(data)
    const updatedObject = {
      name: data.name,
      category: data.category,
      ref_number: data.ref_number,
      description: value,
      main_img: `../assets/${data.main_img}`,
      netto: parseInt(data.netto),
      netto_margin: parseInt(data.netto),
      vat: ((parseInt(data.vat)) / 100) + 1,
      stock: parseInt(data.stock),
      rating: 0,
      dimensions: null,
      weight: null,
      img_gallery: null

    }
    console.log(updatedObject)
    if (productId) {
      Axios.post(`http://localhost:3001/api/admin/products/update-product/${productId}`, {
      updatedObject
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    } else if (!productId) {
      console.log(updatedObject)
      Axios.post(`http://localhost:3001/api/admin/products/add-product`, {
      updatedObject
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <>
      {err ? <div>{err}</div> : <></>}
      {isPennding && productId !== null ? <></> : 
        <div className="editProduct">
          <div className="editProduct__product">
            <form className="form" id="productForm" onSubmit={handleSubmit(submitProduct)}>
              <div className="productForm">
                <div className="img">
                  {productObject && productId ? <img src={`../assets/${productObject.main_img}`} alt={productObject.name} /> : <img src={`../assets/i.png`} alt='placeholder' />}
                  <FormInput controls={productImg} register={register}/>
                  <span className="input__err">{errors.main_img?.message}</span>
                </div>
                <div className="left">
                  <FormInput controls={productName} register={register}/>
                  <span className="input__err">{errors.name?.message}</span>
                  <FormInput controls={productCategory} register={register}/>
                  <span className="input__err">{errors.category?.message}</span>
                  <FormInput controls={productRef} register={register}/>
                  <span className="input__err">{errors.ref_number?.message}</span>
                  
                </div>
                <div className="right">
                  <FormInput controls={productNetto} register={register}/>
                  <span className="input__err">{errors.netto?.message}</span>
                  <FormInput controls={productVat} register={register}/>
                  <span className="input__err">{errors.vat?.message}</span>
                  <FormInput controls={productQty} register={register}/>
                  <span className="input__err">{errors.stock?.message}</span>
                </div>
              </div>
              <div className="form__input">
                <label htmlFor='description'>Opis produktu</label>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
                <br />
                {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                {/* <textarea name="description" id="description" cols="30" rows="10" {...register("description")}></textarea> */}
              </div>
              <span className="input__err">{errors.description?.message}</span>
              {productId ? <button className="btn marginTop" type="submit">Zaktualizuj produkt</button> : <button className="btn marginTop" type="submit">Dodaj produkt</button>}
            </form>
          </div>
          <div className="marginTop"></div>
          <button className="btn marginTop" form="productForm" onClick={() => viewProduct(null, false)}>
          Wróć do listy produktów
          </button>
        </div>
      }
    </>
  )
}
