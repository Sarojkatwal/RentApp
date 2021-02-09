import * as onnx from 'onnxjs'
function toOnnx(blob)
{
    console.log(blob)
    // blob.arrayBuffer().then((buffer)=>
    // {
        
    // const tensor=new onnx.Tensor(new Float32Array(buffer),'float32')
    // console.log(tensor)

    // })
}
export {toOnnx}