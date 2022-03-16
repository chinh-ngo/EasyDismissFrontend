import {useDispatch, useSelector} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';

const ConfirmDialog = () => {
    const confirmState = useSelector((state) => state.ui.confirmDialog);
    const dispatch = useDispatch();

    return (
        <Modal show={confirmState.showModal} onHide={confirmState.cancelAction}>
            <Modal.Header closeButton={false}>
                <Modal.Title>{confirmState.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-danger">{confirmState.message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={confirmState.cancelAction}>
                    {confirmState.noLabel}
                </Button>
                <Button
                    variant="danger"
                    onClick={() =>
                        confirmState.confirmAction(
                            confirmState.type,
                            confirmState.id
                        )
                    }
                >
                    {confirmState.yesLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
