"use client"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
   SelectGroup,
} from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';
import Image from 'next/image';
import {useState} from "react"

const OptionDisplay = () => {
   const picture1 = '/Images/img1.jpg';
   const picture2 = '/Images/img2.jpg';
   const picture3 = '/Images/img3.jpg';
   const picture4 = '/Images/img4.jpg';

   const values = {
			nature1: picture1,
			nature2: picture2,
			nature3: picture3,
         nature4: picture4,
		};
   const [selectedValue, setSelectedValue] = useState(values.nature1);

	
	return (
		<>
			<Select defaultValue={values.nature1} onValueChange={setSelectedValue}>
				<SelectTrigger className="flex m-auto mt-8 align-middle justify-self-center w-2/4">
					<SelectValue placeholder="Select an image" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Images</SelectLabel>
						<SelectItem value={values.nature1}>image 1</SelectItem>
						<SelectItem value={values.nature3}>image 2</SelectItem>
						<SelectItem value={values.nature2}>image 3</SelectItem>
						<SelectItem value={values.nature4}>image 4</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div>
				<div className='rounded'>
					<Image src={selectedValue} width={300} height={500} alt={`The ${selectedValue}`} className='rounded-xl flex m-auto justify-center align-middle mt-10 w-[3/4] lg:w-1/4'/>
				</div>
			</div>
		</>
	);
};

export default OptionDisplay;
