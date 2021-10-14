import { Container, Row, Col, Image } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import { weatherAPI } from './api/api';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import Loader from './components/Loader';
import Mod from './components/Mod';
import { color_changer } from './utils/util'

const App = withRouter((props) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false);

  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition((position) => {
      history.push(`?longlatt=${position.coords.longitude},${position.coords.latitude}`)
      setModal(true)
    }, (err) => {
      history.push('?city=London')
    })
  }, [])

  const apiCall = async (place) => {
    setData({})
    let response = await weatherAPI.getDefaulLocation(place.longlatt?.split(',')[0], place.longlatt?.split(',')[1], place?.city)
    setData({ ...response.data })
  }

  useEffect(() => {
    let array = location.search.substr(1).split('=');
    let obj = { [`${array[0]}`]: array[1] }

    apiCall(obj)
  }, [location.search])

  useEffect(() => {
    if (data?.weather) setLoading(false)
  }, [data])

  const onChangeSlider = (e) => {
    setData({
      ...data,
      main: {
        ...data.main,
        temp: +e.target.value
      }
    })
  }



  return (
    <Container className='d-flex vh-100 flex-column' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row style={{ margin: 0, height: 15 + 'vh' }}>
        <Header city={data.name} />
      </Row>
      {!loading && data?.weather ? <>
        <Row className='d-flex align-items-center justify-content-center transition' style={{ margin: 0, height: 85 + 'vh', backgroundColor: color_changer(+data.main.temp.toFixed(0)), color: 'white' }}>
          <Col className='d-flex flex-column align-items-center' style={{ padding: 0 }}>
            <Container className='d-flex align-items-center justify-content-center' style={{ padding: 0 }} fluid>
              <Image width='300px' src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`} rounded />
              <h2 style={{ fontWeight: 300, fontSize: 3 + 'rem' }}>{data.name}, {data.sys.country}</h2>
            </Container>
            <h1 style={{ textAlign: 'center', fontSize: 4 + 'rem' }}>{+data.main.temp.toFixed(0)} °C</h1>
            <input onChange={onChangeSlider} value={+data.main.temp.toFixed(0)} type={'range'} min={-50} max={100} style={{marginTop: 30 + 'px'}} className='w-50'/>
          </Col>
        </Row>
      </> : <Row className='d-flex align-items-center justify-content-center' style={{ margin: 0, height: 85 + 'vh', backgroundColor: color_changer(+data?.main?.temp?.toFixed(0)) }}><Loader /></Row>}
      <Mod modal={modal} data={data} setModal={setModal} />
    </Container>
  );
})

export default App;
