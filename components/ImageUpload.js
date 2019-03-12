import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

class InputImage extends Component {  
    state = {
        imageUrl: '',
        buffer: null
    };

    onFileSelected = () => {

        const reader = new FileReader();
        const reader2 = new FileReader();

        const file = this.fileInput.files[0];

        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            }); 
        }

        reader.readAsDataURL(file);

        reader2.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result)});
            console.log(this.state.buffer);
        }

        reader2.readAsArrayBuffer(file);
    }

    onFileRemoved = () => {
        this.setState({
            imageUrl: '',
            buffer: null
        });
    }

    render() {
        const {imageUrl} = this.state;

        if(imageUrl){
            return(
                <Segment padded placeholder>
                    <Image 
                        centered
                        size='medium'
                        src={imageUrl}
                        label={{ as: 'a', icon: {name: 'remove', fitted: true} , 
                                circular: true, floating: true, size: 'large',
                                onClick: () => this.onFileRemoved() }}
                    />
                </Segment>   
            );
        } else {
            return(
                <Segment placeholder>
                    <Header icon>
                    <Icon name='images outline' />
                        No photos are uploaded for this item.
                    </Header>
                    <input 
                        style={{ display: 'none' }} 
                        type='file' 
                        onChange={() => this.onFileSelected()}
                        ref={fileInput => this.fileInput = fileInput}/>
                    <Button primary onClick={() => this.fileInput.click()}>Add Photos</Button>
                </Segment> 
            );
        }
    }
} 

export default InputImage;

