import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateProduct() {
  return (
    <div id="centering">
      <br />
      <h2>Agregar producto Nuevo</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="ej. iPhone 13" />
          <Form.Text className="text-muted">
            Nombre completo del producto.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Linea</Form.Label>
          <Form.Select>
            <option>Smartphone</option>
            <option>Fundas</option>
            <option>Watch</option>
            <option>Glass</option>
            <option>Energia y Cables</option>
            <option>Airpods</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categorias</Form.Label>
          <Form.Select>
            <option>Iphone</option>
            <option>Accesorios</option>
            <option>Watch</option>
            <option>Airpods</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" placeholder="ej. Cyan" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://res.cloudinary.com/imagen.jpg"
          />
          <Form.Text className="text-muted">
            La imagen respectiva al color de arriba.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" placeholder="ej. Apple" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="45" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo Dolar</Form.Label>
          <Form.Select>
            <option>Blue</option>
            <option></option>
            <option>Watch</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://res.cloudinary.com/imagen.jpg"
          />
          <Form.Text className="text-muted">
            Si hay más de una imagen, sepárelas con una ",".
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Modelo</Form.Label>
          <Form.Select>
            <option>Generico</option>
            <option>14 Pro Max</option>
            <option>14 Pro</option>
            <option>14 Plus</option>
            <option>14</option>
            <option>13 Pro Max</option>
            <option>13 Pro</option>
            <option>13 Mini</option>
            <option>13</option>
            <option>12 Pro Max</option>
            <option>12 Pro </option>
            <option>12 Mini</option>
            <option>12</option>
            <option>11 Pro Max</option>
            <option>11 Pro</option>
            <option>SE(3rd)</option>
            <option>SE(2rd)</option>
            <option>iPhone-XS</option>
            <option>iPhone-XS Max</option>
            <option>iPhone-XR</option>
            <option>iPhone-X</option>
            <option>iPhone-8-Plus</option>
            <option>iPhone-8</option>
            <option>iPhone-7-Plus</option>
            <option>iPhone-7</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="5" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Almacenamiento</Form.Label>
          <Form.Select>
            <option>64GB</option>
            <option>128GB</option>
            <option>256GB</option>
            <option>512GB</option>
            <option>1024GB</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select>
            <option>Nuevo</option>
            <option>Swap</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Disponible" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cargar
        </Button>
      </Form>
      <br />
      <br />
    </div>
  );
}
