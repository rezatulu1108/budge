import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createAccount } from '../redux/slices/Accounts';
import { useSelector, useDispatch } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';

const accountTypes = ['Bank', 'Credit Card'];

export default function AddAccountDialog(props) {
  /**
   * State block
   */
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState('')
  const onNameChange = (e) => setName(e.target.value);
  const onAccountTypeChange = (e) => setAccountType(e.target.value);

  /**
   * Redux block
   */
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const budgetId = useSelector(state => state.budgets.activeBudget.id)

  const handleCreateAccount = async () => {
    await dispatch(createAccount({
      name,
      accountType,
      budgetId,
    }))
    reset()
    props.close()
  }

  const reset = () => {
    setName('')
    setAccountType('')
  }

  return (
    <div>
      <Dialog open={props.isOpen} disableEscapeKeyDown={true} onBackdropClick={() => false}>
        <DialogTitle>Add an Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Account name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onNameChange}
          />
          <TextField
            select
            fullWidth
            variant="standard"
            label="Account Type"
            value={accountType}
            onChange={onAccountTypeChange}
            helperText="Please select the account type"
          >
            {accountTypes.map((type, index) => (
              <MenuItem key={index} value={index}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateAccount}>Create Account</Button>
          <Button onClick={props.close}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}