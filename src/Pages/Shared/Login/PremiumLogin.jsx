import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaChefHat,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaShieldAlt,
  FaStar,
  FaHeart,
  FaUtensils
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
im