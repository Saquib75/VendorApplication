import React ,{ FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Picker, { PickerProps } from '../picker/picker.ui';
import cityStateService from '../../../services/cityState.service';

export interface CityStatePickerProps  {
  stateInputProps : Partial<PickerProps>,
  cityInputProps : Partial<PickerProps>,
  
} 

const CityStatePicker:FC<CityStatePickerProps> = ({
  stateInputProps,
  cityInputProps,
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({

  });
  const [states ,setStates]= useState<any>([])
  const [cities ,setCities]= useState([])
  const [stateLoading ,setStateLoading] = useState(false)
  const [citiesLoading ,setCitiesLoading] = useState(false)
  const {data:stateData,placeholder:statePlaceholder ,...restState} = stateInputProps
  const {data:cityData,placeholder:cityPlaceholder ,...restCity} = cityInputProps
  
  const fetchStates = async()=>{
    try{
      setStateLoading(true)
      const stateRes :any = await cityStateService.getStates();
      const temp = stateRes?.data?.data?.map((item:string)=>({
        title : item,value : item
      }))
      setStates(temp);
    }catch(err){
      console.log("Fetch States err", err);
    }finally{
      setStateLoading(false)
    }
  }
  const fetchCities = async(state_name:string)=>{
    try{
      setStateLoading(true)
      const cityRes :any = await cityStateService.getCities(state_name);
      const temp = cityRes?.data?.data?.map((item:string)=>({
        title : item,value : item
      }))
      setCities(temp);
    }catch(err){
      console.log("Fetch City err", err);
    }finally{
      setStateLoading(false)
    }
  }
  useEffect(()=>{
    fetchStates()
  },[])
  useEffect(()=>{
    if(restState.value) fetchCities(restState.value)
  },[restState.value])
  return (
    <React.Fragment>
        <Picker
          label="State"
          placeholder='Choose your state...'
          data={states}
          {...restState as any}
          searchable
        />
        <Picker
          disabled={!restState.value}
          label="City"
          placeholder='Choose your city...'
          data={cities}
          searchable
          {...restCity as any}
        />
    </React.Fragment>
  );
};

export default CityStatePicker;